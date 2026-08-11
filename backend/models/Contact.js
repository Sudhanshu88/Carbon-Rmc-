import mongoose from 'mongoose';
const ContactSchema = new mongoose.Schema({
  name:        { type: String, required: true, trim: true },
  phone:       { type: String, required: true, trim: true },
  email:       { type: String, trim: true, lowercase: true },
  projectType: { type: String, enum: ['Residential','Commercial','Industrial','RMC Supply','Renovation','Other'], required: true },
  message:     { type: String, required: true },
  status:      { type: String, enum: ['new','contacted','converted','closed'], default: 'new' },
  notes:       { type: String, default: '' },
}, { timestamps: true });
export default mongoose.models?.Contact || mongoose.model('Contact', ContactSchema);
