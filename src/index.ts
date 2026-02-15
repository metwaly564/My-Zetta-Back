import dotenv from 'dotenv';
dotenv.config();

import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import servicesRouter from './routes/services';
import partnersRouter from './routes/partners';
import leadsRouter from './routes/leads';
import compareRouter from './routes/compare';
import authRouter from './routes/auth';
import errorhandler from './middlewares/errorMiddleware';

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

app.listen(PORT, async () => {
    console.log(`Zetta Backend is running on http://localhost:${PORT}`);

    // Diagnostic check
    if (!process.env.DATABASE_URL) {
        console.error('CRITICAL: DATABASE_URL is not defined in environment variables.');
    } else {
        try {
            const prisma = (await import('./DB/connection')).default;
            await prisma.$connect();
            console.log('✅ Database connected successfully.');
        } catch (error) {
            console.error('❌ Database connection failed:', (error as Error).message);
        }
    }
});
