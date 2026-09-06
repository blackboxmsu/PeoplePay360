import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function verify() {
  await mongoose.connect(process.env.MONGO_URI);
  const cols = await mongoose.connection.db.listCollections().toArray();
  console.log('\n========================================');
  console.log('       MONGODB ATLAS SCHEMA AUDIT       ');
  console.log('========================================');
  for (const c of cols.sort((a, b) => a.name.localeCompare(b.name))) {
    const count = await mongoose.connection.db.collection(c.name).countDocuments();
    console.log(` Collection: ${c.name.padEnd(20)} | Records: ${count}`);
  }
  console.log('========================================\n');
  await mongoose.disconnect();
}

verify().catch(console.error);
