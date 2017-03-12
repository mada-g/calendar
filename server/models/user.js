import mongoose from 'mongoose';

import monthData from './monthData.js';

export default mongoose.Schema({
  username: String,
  password: String,
  uid: String,
  months: [monthData]
})
