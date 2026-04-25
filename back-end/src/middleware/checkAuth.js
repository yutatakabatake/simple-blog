import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

function checkAuth(req, res, next) {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        res.status(401).json([
            {
                message: "No permission"
            }
        ])
    }

    try {
        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        return res.status(400).json([
            {
                message: "Unmatch token"
            }
        ]);
    }
}

export default checkAuth