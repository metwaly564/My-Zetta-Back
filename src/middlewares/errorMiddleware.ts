import { Request, Response, NextFunction } from 'express';

export default function errorhandler(err: any, req: Request, res: Response, next: NextFunction) {
    console.error(err.stack);

    const status = err.status || 500;
    const message = err.message || 'Something went wrong';

    res.status(status).json({
        status: 'error',
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
}
