const mongoose = require('mongoose');

main()
  .then(() => console.log('connected to mongodb'))
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/authentication');
}