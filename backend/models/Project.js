import mongoose from 'mongoose';
const ProjectSchema = new mongoose.Schema({
  title:       { type: String, required: true, trim: true },
  category:    { type: String, enum: ['Residential','Commercial','Industrial','Institutional','Infrastructure'], required: true },
  location:    { type: String, required: true },
  city:        { type: String, required: true },
  year:        { type: String, required: true },
  area:        { type: String },
  client:      { type: String },
  status:      { type: String, enum: ['Completed','Ongoing','Upcoming'], default: 'Ongoing' },
  emoji:       { type: String, default: '🏗️' },
  description: { type: String },
  highlights:  [{ type: String }],
  featured:    { type: Boolean, default: false },
  order:       { type: Number, default: 0 },
}, { timestamps: true });
export default mongoose.models?.Project || mongoose.model('Project', ProjectSchema);
