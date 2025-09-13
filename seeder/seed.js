import 'dotenv/config';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';

const run = async () => {
  await connectDB(process.env.MONGO_URI);
  const email = 'admin@gmail.com';
  const exists = await User.findOne({ email });
  if (exists) {
    console.log('Admin already exists');
    process.exit(0);
  }
  const admin = new User({ name: 'Admin', email, password: 'Admin@123', role: 'admin' });
  await admin.save();
  console.log('Admin created:', { id: admin._id, email: admin.email });
  process.exit(0);
};

run().catch(err => {
  console.error(err);
  process.exit(1);
});
