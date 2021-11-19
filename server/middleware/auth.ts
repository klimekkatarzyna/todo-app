import jwt from 'jsonwebtoken';

interface Request {
    headers: {
        authorization: string;
    },
    user: any;
}

interface Response {
    status: any;
}

type MyToken = {
    userId: string
    email: string
    iat: number
    exp: number
}

export default (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: "Auth Error" });

    try {
        const decoded = jwt.verify(token, ":7HK2ATab_", { algorithms: ['RS256'] }) as MyToken;
        req.user = decoded.userId;
        next();
    } catch (e) {
        res.status(500).send({ 
            message: "Invalid Token",
            status: 500
        });
    }
};