const mongoose = require("mongoose");

const mongodb = async function main() {
  await mongoose.connect("mongodb+srv://cknishma1999:LwkuZlisawDU4zLa@cluster0.2xjkolm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"); //27017 default port number and test is default database name
};
module.exports = mongodb;