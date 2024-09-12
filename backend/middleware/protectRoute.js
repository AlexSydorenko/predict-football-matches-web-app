import jwt from 'jsonwebtoken';

export const protectRoute = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized! No token provided!' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ error: 'Unauthorized! Invalid token!' });
        }

        req.userId = decoded.userId;

        next();

    } catch (error) {
        console.log('Error in protectRoute middleware: ', error.message);
        res.status(500).json({ error: 'Internal server error!' });
    }
}
