# pizza-ordering



## Getting started
### Run the application at your local
- Clone this repository
```
git clone https://gitlab.com/wisdomengineering/pizza-ordering.git
```
- Now you have a folder called pizza-ordering that contains folders and files like these below
```
.git
backend
frontend
sample-data
.gitignore
docker-compose.production.yml
docker-compose.yml
kin-pizza.postman_collection.json
README.md
```
- Here are the steps to run the application at your local machine without installing mongodb compass (You don't need to setup the database, the database now is hosted in cloud server, but you must aware that this will increase the latency between the database server and the application server)

1. Install dependecies for both backend and frontend folder
```
cd backend
npm install

cd frontend
npm install
```
Now you have all depencencies which are the system needs, move to step 2

2. Create .env file

In the folder backend, you create a file '.env', then pass content into it

```
PORT=5000
DB_HOST=localhost
DB_PORT=27017
DB_NAME=pizza-ordering-1
DB_USER=kin
DB_PASSWORD=abc12345
MONGO_STRING_URI=mongodb+srv://kin:abc12345@pizza-ordering.jidyqig.mongodb.net/pizza-ordering-1?retryWrites=true&w=majority
NODE_ENV=development

JWT_SECRET=whatdoyouwant

TOKEN_EXPIRES=7d
REFRESH_TOKEN_EXPIRES=30d
REFRESH_TOKEN_DAYS=30

IMAGE_FOLDER=public/api/images

LIMIT_PRODUCTS=15
LENGTH_UID=8

CLIENT_URL=http://localhost:3000

EMAIL_NAME=info.kinpizza@gmail.com
EMAIL_APP_PASSWORD=ddmgalcnpuqcfndp
EMAIL_ADMIN=thuan.jolly@gmail.com
#EMAIL_ADMIN=anhtuan159843@gmail.com
```

3. Run the system
```
cd backend
npm run dev

cd frontend
npm run dev
```

4. Use POSTMAN to test api

Once you have opened postman, you will see a button name inport at the top. You click it and import the file called 'kin-pizza.postman_collection.json'. After that, you can test the application's api.

```
admin login
0922222501
abc12345
```

- Here are the steps to run the application at your local machine
1. Connect to mongodb port 27017 using mongodb compass (default connect)

You will see a mongosh terminal at the left-bottom, open it, and type

```
use pizza-ordering-1;
db.createUser(
  {
    user: "kin",
    pwd:  "abc12345",
    roles: [ { role: "dbOwner", db: "pizza-ordering-1" } ]
  }
);
```
Now you have a database named pizza-ordering-1 with the owner is kin

You can disconnect the default connect and try connect again with the uri, if it was successfully, move to the step 2
```
mongodb://kin:abc12345@localhost:27017/pizza-ordering-1
```
2. Initalize database with sample data (Once at the first time)

Click the database pizza-ordering-1, you will see a button called 'create collection', you must create 4 collections including employess, productcategories, products, sizes. With each collection, you will see a button named 'ADD Data', click it and choose 'Import JSON...', then you import files  in the folder named 'sample-data' with each file corrected to each collection. 

3. Install dependecies for both backend and frontend folder
```
cd backend
npm install

cd frontend
npm install
```
Now you have all depencencies which are the system needs, move to step 4

4. Create .env file

In the folder backend, you create a file '.env', then pass content into it

```
PORT=5000
DB_HOST=localhost
DB_PORT=27017
DB_NAME=pizza-ordering-1
DB_USER=kin
DB_PASSWORD=abc12345
MONGO_STRING_URI=
NODE_ENV=development

JWT_SECRET=whatdoyouwant

TOKEN_EXPIRES=7d
REFRESH_TOKEN_EXPIRES=30d
REFRESH_TOKEN_DAYS=30

IMAGE_FOLDER=public/api/images

LIMIT_PRODUCTS=15
LENGTH_UID=8

CLIENT_URL=http://localhost:3000

EMAIL_NAME=info.kinpizza@gmail.com
EMAIL_APP_PASSWORD=ddmgalcnpuqcfndp
EMAIL_ADMIN=thuan.jolly@gmail.com
#EMAIL_ADMIN=anhtuan159843@gmail.com
```

5. Run the system
```
cd backend
npm run dev

cd frontend
npm run dev
```

6. Use POSTMAN to test api

Once you have opened postman, you will see a button name inport at the top. You click it and import the file called 'kin-pizza.postman_collection.json'. After that, you can test the application's api.

### Run the application using docker
- Comming soon
