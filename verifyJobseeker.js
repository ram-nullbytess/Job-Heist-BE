const varifyJobseeker = (req, res, next) => {
    if (req.user.role !== "jobSeeker") 
    return res.status(401).send('NO UNAUTHORISED ACCESS');
    next();
}

module.exports = varifyJobseeker;