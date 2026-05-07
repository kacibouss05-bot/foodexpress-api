import jwt from 'jsonwebtoken';
const   JWT_SECRET = process.env.JWT_SECRET || 'secret_dev'
export function generateToken(user){
    return jwt.sign (
        {id:user.id,email:user.email,role:user.role},
        JWT_SECRET,
        {expiresIn:'7d'}
    );
}
export function authenticate (req,res,next){
    const authHeader =req.headers.authorization;
    if(!authHeader)return res.status(401).json({error:'Token manquant'});
    const token =authHeader.split(' ')[1];
    try{
        const decoded =jwt.verify(token,JWT_SECRET)
        req.user=decoded;
        next();

    }catch(err){
        return res.status(401).json({error :'token est invalid'});
    }
}
export function isAdmin(req,res,next){
    if (req.user.role !=='admin'){
        return res.status(403).json({
            error:'acccces admin requissss:'
        })
    }
    next();
}