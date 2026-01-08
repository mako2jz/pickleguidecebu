// Role-based access control middleware
const allowRoles = (...allowedRoles) => {
    return (req, res, next) => {
        // Check if req.user exists (auth.js must run first)
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required. Please login first.'
            });
        }

        // Check if user's role is in the allowed roles
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Insufficient permissions.'
            });
        }

        // User is authorized, proceed
        next();
    };
};

// Admin only middleware
const adminOnly = (req, res, next) => {
    // Check if req.user exists
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: 'Authentication required. Please login first.'
        });
    }

    // Check for admin or super_admin role
    if (req.user.role !== 'admin' && req.user.role !== 'super_admin') {
        return res.status(403).json({
            success: false,
            message: 'Access denied. Admin privileges required.'
        });
    }

    // User is authorized, proceed
    next();
};


// Super admin-only middleware
const superAdminOnly = (req, res, next) => {
    // Check if req.user exists
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: 'Authentication required. Please login first.'
        });
    }

    // Check for super_admin role only
    if (req.user.role !== 'super_admin') {
        return res.status(403).json({
            success: false,
            message: 'Access denied. Super admin privileges required.'
        });
    }

    // User is authorized, proceed
    next();
};

export { allowRoles, adminOnly, superAdminOnly };
