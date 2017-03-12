import mongoose from 'mongoose';

import dayData from './dayData.js';

export default mongoose.Schema({
  year: Number,
  month: Number,
  days: [dayData]
})
