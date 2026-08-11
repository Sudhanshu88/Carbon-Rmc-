import mongoose from 'mongoose';
const EmployeeSchema = new mongoose.Schema({
  empId:      { type: String, required: true, unique: true, uppercase: true },
  name:       { type: String, required: true, trim: true },
  role:       { type: String, required: true },
  department: { type: String, enum: ['Engineering','Site','Admin','Sales','Finance','HR','Operations','Management'], required: true },
  phone:      { type: String },
  email:      { type: String, lowercase: true },
  experience: { type: String },
  emoji:      { type: String, default: '👤' },
  linkedin:   { type: String, default: '#' },
  joinDate:   { type: Date },
  active:     { type: Boolean, default: true },
}, { timestamps: true });
export default mongoose.models?.Employee || mongoose.model('Employee', EmployeeSchema);
