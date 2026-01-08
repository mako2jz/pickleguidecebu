import rateLimit from 'express-rate-limit';

/**
 * Rate Limiting Middleware
 * 
 * Prevents abuse by limiting requests per IP address.
 * Different limiters for different use cases.
 */

// General API limiter (for most routes)
export const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requests per window
    message: {
        success: false,
        message: 'Too many requests. Please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false
});

// Strict limiter for auth routes (login, etc.)
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 login attempts per window
    message: {
        success: false,
        message: 'Too many login attempts. Please try again after 15 minutes.'
    },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true // Don't count successful logins
});

// Submission limiter (court submissions)
export const submissionLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, // 3 submissions per hour
    message: {
        success: false,
        message: 'Too many submissions. Please try again after an hour.'
    },
    standardHeaders: true,
    legacyHeaders: false
});

// Review limiter
export const reviewLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10, // 10 reviews per hour
    message: {
        success: false,
        message: 'Too many reviews submitted. Please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false
});

// Admin actions limiter (less strict, but still protected)
export const adminLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // 50 admin actions per window
    message: {
        success: false,
        message: 'Too many requests. Please slow down.'
    },
    standardHeaders: true,
    legacyHeaders: false
});
