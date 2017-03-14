import mongoose from 'mongoose';

export default mongoose.Schema({
  dId: String,
  year: Number,
  month: Number,
  dayNum: Number,
  metaD: String,
  eventsData: String
})
