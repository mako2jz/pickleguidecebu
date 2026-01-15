import rateLimit from 'express-rate-limit';

/**
 * Rate Limiting Middleware
 * 
 * Prevents abuse by limiting requests per IP address.
 * Different limiters for different use cases.
 */

// General API limiter (for most routes) - more lenient for normal usage
export const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 500, // 500 requests per window (more reasonable for SPA)
    message: {
        success: false,
        message: 'Too many requests. Please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false,
    // Skip rate limiting for GET requests to public endpoints
    skip: (req) => {
        const publicGetRoutes = ['/api/courts', '/api/health'];
        return req.method === 'GET' && publicGetRoutes.some(route => req.path.startsWith(route));
    }
});

// Public read-only limiter (very lenient - just prevents extreme abuse)
export const publicReadLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 240, // 240 requests per minute (4 per second average)
    message: {
        success: false,
        message: 'Too many requests. Please try again shortly.'
    },
    standardHeaders: true,
    legacyHeaders: false
});

// Strict limiter for auth routes (login, etc.)
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // 10 login attempts per window (increased from 5)
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
