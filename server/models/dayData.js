import mongoose from 'mongoose';

export default mongoose.Schema({
  eId: String,
  year: Number,
  month: Number,
  dayNum: Number,
  metaD: String,
  events: String
})
