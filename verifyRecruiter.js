const varifyRecruiter = (req, res, next) => {
    if (req.user.role !== "recruiter") 
    return res.status(401).send('NO UNAUTHORISED ACCESS');
    next();
}

module.exports = varifyRecruiter;