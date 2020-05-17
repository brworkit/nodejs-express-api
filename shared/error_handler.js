module.exports = errorHandler;

function errorHandler(err, req, res, next) {
    
    console.log("err: " + err)
    // console.log("req: " + req)
    // console.log("res: " + res)
    // console.log("next: " + next)

    if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json({ message: err });
    }

    if (err.name === 'ValidationError') {
        // mongoose validation error
        return res.status(400).json({ message: err.message });
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        
        return res.status(401).json({ message: 'Invalid Token Test' });
    }

    // default to 500 server error
    return res.status(500).json({ message: err.message });
}