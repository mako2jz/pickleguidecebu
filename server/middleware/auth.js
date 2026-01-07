import jwt from 'jsonwebtoken';

/*
TODO: RATE LIMITING MIDDLEWARE
*/

// Authentication middleware to protect routes
const auth = (req, res, next) => {
    try {
        // Read the JWT from HttpOnly cookie
        const token = req.cookies?.token;

        // Block if no token
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.'
            });
        }

        // Verify the JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Decode and attach user info to request
        req.user = {
            id: decoded.userId,
            role: decoded.role
        };

        // User is authenticated, proceed to next middleware/controller
        next();

    } catch (error) {
        // Handle specific JWT errors
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token expired. Please login again.'
            });
        }

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Invalid token.'
            });
        }

        // Generic error
        return res.status(401).json({
            success: false,
            message: 'Authentication failed.'
        });
    }
};

export default auth;
