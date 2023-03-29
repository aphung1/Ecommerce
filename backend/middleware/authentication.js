import jwt from 'jsonwebtoken';

const authentication = (req, res, next) => {
    // Checks if request has a authorization header set
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.sendStatus(401);
    }

    // Tokens are structured like 'Bearer <token>' so we are retrieving the token
    const token = authHeader.split(' ')[1]

    // Provide a callback function to deal with error and the decoded information from the token
    jwt.verify(token, "my own secret not very secret",
    (err, decoded) => {
        if (err) {
            return res.sendStatus(403);     // Return 403 if token is invalid
        }
        req.user = decoded.id;
        next();
    })
}

export default authentication