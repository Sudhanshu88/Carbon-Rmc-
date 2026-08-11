// Run: node scripts/seed.js
import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from '../lib/db.js';
import User    from '../models/User.js';
import Project from '../models/Project.js';
import Employee from '../models/Employee.js';
import Office  from '../models/Office.js';

await connectDB();
console.log('🌱 Seeding database...');

// Admin
const existingAdmin = await User.findOne({ email: 'admin@carbonrmc.com' });
if (!existingAdmin) {
  await User.create({ name: 'Carbon RMC Admin', email: 'admin@carbonrmc.com', password: 'Admin@1234', role: 'superadmin' });
  console.log('✅ Admin user created');
}

// Sample Projects
await Project.deleteMany({});
await Project.insertMany([
  { title: 'Skyline Residency', category: 'Residential', location: 'Andheri West', city: 'Mumbai', year: '2024', status: 'Completed', emoji: '🏙️', featured: true },
  { title: 'TechHub Corporate Park', category: 'Commercial', location: 'Hinjewadi', city: 'Pune', year: '2023', status: 'Completed', emoji: '🏢', featured: true },
  { title: 'Green Valley Villas', category: 'Residential', location: 'Gangapur Road', city: 'Nashik', year: '2024', status: 'Completed', emoji: '🌿' },
  { title: 'Apex Industrial Hub', category: 'Industrial', location: 'Butibori', city: 'Nagpur', year: '2022', status: 'Completed', emoji: '🏭' },
  { title: 'Metro Heights Phase 2', category: 'Residential', location: 'Adajan', city: 'Surat', year: '2025', status: 'Ongoing', emoji: '🏗️', featured: true },
]);
console.log('✅ Projects seeded');

// Sample Employees
await Employee.deleteMany({});
await Employee.insertMany([
  { empId: 'CRMC-001', name: 'Rajesh Kumar', role: 'Managing Director', department: 'Management', phone: '+91-98765-00001', emoji: '👔', experience: '20 years' },
  { empId: 'CRMC-002', name: 'Priya Sharma', role: 'Chief Engineer', department: 'Engineering', phone: '+91-98765-00002', emoji: '👩💼', experience: '15 years' },
  { empId: 'CRMC-003', name: 'Anil Patel', role: 'Site Manager', department: 'Site', phone: '+91-98765-00003', emoji: '👷', experience: '10 years' },
  { empId: 'CRMC-004', name: 'Sunita Desai', role: 'HR Manager', department: 'HR', phone: '+91-98765-00004', emoji: '👩💼', experience: '8 years' },
  { empId: 'CRMC-005', name: 'Vikram Singh', role: 'Sales Head', department: 'Sales', phone: '+91-98765-00005', emoji: '💼', experience: '12 years' },
]);
console.log('✅ Employees seeded');

// Sample Offices
await Office.deleteMany({});
await Office.insertMany([
  { name: 'Head Office', type: 'office', isHQ: true, emoji: '🏢', address: 'Ram Nagari, Rukanpura, Patna, Bihar 800025', city: 'Patna', state: 'Bihar', pincode: '800025', phones: ['+91-9031835122', '+91-9031835123'], email: 'carbonrmc@gmail.com', manager: 'Manager Name', weekdays: '9:00 AM – 8:00 PM', saturday: '9:00 AM – 3:00 PM', sunday: 'Closed', mapLat: 25.618019, mapLng: 85.0754069 },
  { name: 'Carbon RMC Plant', type: 'plant', emoji: '🏭', address: 'Near Patna, Bihar', city: 'Patna', state: 'Bihar', phones: ['+91-9031835122', '+91-9031835123'], email: 'carbonrmc@gmail.com', incharge: 'Plant Incharge', capacity: '60 Cum/hr', grades: 'M15 to M60', weekdays: 'Open 24 Hours', saturday: 'Open 24 Hours', sunday: 'Open 24 Hours', mapLat: 25.5637777, mapLng: 84.9905708 },
]);
console.log('✅ Offices seeded');

console.log('\n🎉 Database seeded successfully!');
process.exit(0);
