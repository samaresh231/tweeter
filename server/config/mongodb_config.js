require('dotenv').config()
const mongoose = require('mongoose');

main()
  .then(() => console.log('connected to mongodb'))
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.mongo_url);
}