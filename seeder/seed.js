import 'dotenv/config';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';

const run = async () => {
  await connectDB(process.env.MONGO_URI);
  const email = process.env.ADMIN_EMAIL;
  const exists = await User.findOne({ email });
  if (exists) {
    console.log('Admin already exists');
    process.exit(0);
  }
  const admin = new User({ name: process.env.ADMIN_NAME, email, password: process.env.ADMIN_PASSWORD, role: 'admin' });
  await admin.save();
  console.log('Admin created:', { id: admin._id, email: admin.email });
  process.exit(0);
};

run().catch(err => {
  console.error(err);
  process.exit(1);
});
