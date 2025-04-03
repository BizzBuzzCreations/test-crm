import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import campaignRoutes from './routes/campaign.routes.js';
import teamRoutes from './routes/teams.routes.js';
import usertypeRoutes from './routes/usertype.routes.js';
import statusRoutes from './routes/status.routes.js';
import notesRoutes from './routes/notes.routes.js';
import leadsRoutes from './routes/leads.routes.js';
import userRoutes from './routes/users.routes.js';

const app = express();

// app.use() is use for middleware or config
app.use(cors({ // read documentation for detail undestaning
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({
    limit: "16kb"
}))
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))
app.use(express.static("public"))
app.use(cookieParser())

// Routes
app.use('/api/campaigns', campaignRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/user-types', usertypeRoutes);
app.use('/api/statuses', statusRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/leads', leadsRoutes);
app.use('/api/users', userRoutes);

export { app };