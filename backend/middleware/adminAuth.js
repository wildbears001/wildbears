import jwt from 'jsonwebtoken'

const adminAuth = async(req,res,next)=>{
    try {
        const {token} = req.headers
        if (!token) {
           return res.json({success:false,message:'Not Authorized'})
        }

        // Check for old legacy signature token directly generating an env string
        try {
            const token_decode_legacy = jwt.verify(token,process.env.JWT_SECRET);
            if(typeof token_decode_legacy === 'string' && token_decode_legacy === process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
                req.adminRole = 'Super Admin';
                return next();
            }
        } catch (e) {}

        // Check for the newly structured role-based Object Tokens
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        if(token_decode && (token_decode.id || token_decode.type === 'ENV_ADMIN')){
            req.adminRole = token_decode.role || 'Manager';
            return next();
        }

        return res.json({success:false,message:'Not Authorized'})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}
export default adminAuth