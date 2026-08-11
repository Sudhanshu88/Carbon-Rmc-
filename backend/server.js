// backend/server.js — Main Express Server (Vercel compatible)
import 'dotenv/config';
import express    from 'express';
import cors       from 'cors';
import morgan     from 'morgan';
import { connectDB } from './lib/db.js';

// ── Routes
import authRoutes     from './routes/auth.js';
import contactRoutes  from './routes/contact.js';
import projectRoutes  from './routes/projects.js';
import employeeRoutes from './routes/employees.js';
import officeRoutes   from './routes/offices.js';
import statsRoutes    from './routes/stats.js';

const app = express();

// ── Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(morgan('dev'));

// ── DB connect (lazy — for serverless)
connectDB().catch(err => console.error('❌ DB:', err.message));

// ── Health check
app.get('/', (_, res) => res.json({
  status: 'ok',
  app: 'Carbon RMC API',
  version: '1.0.0',
  endpoints: ['/api/auth', '/api/contact', '/api/projects', '/api/employees', '/api/offices', '/api/stats'],
}));

// ── API Routes
app.use('/api/auth',      authRoutes);
app.use('/api/contact',   contactRoutes);
app.use('/api/projects',  projectRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/offices',   officeRoutes);
app.use('/api/stats',     statsRoutes);

// ── 404 Handler
app.use((req, res) => res.status(404).json({ error: `Route ${req.method} ${req.url} not found` }));

// ── Error Handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// ── Local dev server (NOT used on Vercel)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`\n✅ Carbon RMC Backend running on http://localhost:${PORT}`);
  });
}

// ── Export for Vercel serverless
export default app;
