const { MongoClient } = require('mongodb');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

// Function to perform MongoDB backup
async function backupMongoDB() {
    // Thông tin kết nối đến MongoDB
    const mongoURI = process.env.MONGO_STRING_URI;
    const dbName = process.env.DB_NAME;

    // Đường dẫn lưu trữ bản sao lưu
    const backupDir = "./src/backup/";
  try {
    const client = new MongoClient(mongoURI, { useUnifiedTopology: true });
    await client.connect();

    const db = client.db(dbName);

    // Create a backup file name based on date and time
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const backupFileName = `backup_${timestamp}.bson`;

    // Use mongodump to create a backup
    const { stdout, stderr } = await exec(`C:\\mongodb-database-tools\\bin\\mongodump --uri "${mongoURI}" --out "${backupDir}"`);

    console.log(`Backup stdout: ${stdout}`);
    console.error(`Backup stderr: ${stderr}`);

    console.log(`Backup successful: ${backupDir}${backupFileName}`);

    client.close();
  } catch (error) {
    console.error("Error performing backup:", error);
  }
}

module.exports = { backupMongoDB };
