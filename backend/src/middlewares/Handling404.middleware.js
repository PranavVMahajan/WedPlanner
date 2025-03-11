exports.HandlingNotFound=(err,req,res,next)=>{
    res.status(err.statusCode || 500).json({
        code:err.statusCode,
        error: err.message,
        message:err.stack
    });
}