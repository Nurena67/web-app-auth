import jwt from 'jsonwebtoken';

export const verifyUser = async (req, res, next) =>{
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({msg: "Token tidak ditemukan, Mohon login!"});
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ msg: "Token tidak valid." });
        }
        req.userId = decoded.uuid;
        req.role = decoded.role;
        next();
    });
};

export const adminOnly = async (req, res, next) =>{
    if (req.role !== "admin") {
        return res.status(403).json({ msg: "Akses terlarang" });
    }
    next();
}