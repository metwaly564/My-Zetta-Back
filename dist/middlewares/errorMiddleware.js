"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = errorhandler;
function errorhandler(err, req, res, next) {
    console.error(err.stack);
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';
    res.status(status).json({
        status: 'error',
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
}
