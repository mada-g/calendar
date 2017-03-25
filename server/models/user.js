import mongoose from 'mongoose';

import monthData from './monthData.js';
import dayData from './dayData.js';

export default mongoose.Schema({
  username: String,
  password: String,
  uid: String,
  days: [dayData],
  tags: [String],
  people: [String]  
})
