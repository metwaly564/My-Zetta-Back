import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import servicesRouter from './routes/services';
import partnersRouter from './routes/partners';
import leadsRouter from './routes/leads';
import compareRouter from './routes/compare';
import authRouter from './routes/auth';
import errorhandler from './middlewares/errorMiddleware';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/services', servicesRouter);
app.use('/api/partners', partnersRouter);
app.use('/api/leads', leadsRouter);
app.use('/api/compare', compareRouter);
app.use('/api/auth', authRouter);

// Error handling middleware
app.use(errorhandler);

app.listen(PORT, () => {
    console.log(`Zetta Backend is running on http://localhost:${PORT}`);
});
