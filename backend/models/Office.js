import mongoose from 'mongoose';
const OfficeSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  type:      { type: String, enum: ['office','plant'], required: true },
  isHQ:      { type: Boolean, default: false },
  emoji:     { type: String, default: '🏢' },
  address:   { type: String, required: true },
  city:      { type: String, required: true },
  state:     { type: String, required: true },
  pincode:   { type: String },
  phones:    [{ type: String }],
  email:     { type: String },
  manager:   { type: String },
  mapLat:    { type: Number },
  mapLng:    { type: Number },
  weekdays:  { type: String, default: '9:00 AM – 6:30 PM' },
  saturday:  { type: String, default: '9:00 AM – 2:00 PM' },
  sunday:    { type: String, default: 'Closed' },
  capacity:  { type: String },
  grades:    { type: String },
  incharge:  { type: String },
  active:    { type: Boolean, default: true },
}, { timestamps: true });
export default mongoose.models?.Office || mongoose.model('Office', OfficeSchema);
