const express = require('express');
require("dotenv").config()
// --
const { backupMongoDB } = require('./src/backup/backup.js');
const cron = require('node-cron');
// --
const cors = require('cors');
const dbConnect = require('./src/config/dbconnect')
const initRoutes = require('./src/routes')
const cookieParser = require('cookie-parser')
// documenting express js api swagger
const swaggerUi = require("swagger-ui-express");
const specs = require('./src/config/swagger');
// limiting number of requests
const { rateLimiter } = require("./src/utils/rate-limiter.js");
const { infoLogger } = require("./src/utils/logger");

const app = express()

whiteList = ["https://kinpizza.com", "http://kinpizza.com", "http://localhost:3000"]
const corsOptions = {
    credentials: true,
    methods: ["POST", 'GET', 'PUT', "DELETE"],
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}
app.use(cookieParser())
app.use(cors(corsOptions))

app.use(infoLogger);
app.use(rateLimiter);

// Function to serve all static files
// inside public directory.
app.use(express.static('public')); 
app.use('/api/images', express.static(process.env.IMAGE_FOLDER));
app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

dbConnect()
const port = process.env.PORT || 8081
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origin: whiteList
    }
});

global._io = io;
const SocketService = require('./src/services/order');
initRoutes(app)
global._io.on('connection', SocketService.connection)

//-- Schedule backup daily at 2:00 AM
cron.schedule('0 2 * * *', () => {
    backupMongoDB();
  });
//--

http.listen(port, () => {
    console.log(`Server is running on port ${http.address().port} with Socket.IO`)
})
