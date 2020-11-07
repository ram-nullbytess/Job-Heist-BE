const Joi = require('@hapi/joi');

const signUpValidation = (req,res,next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(255).required(), //.pattern(new RegExp('^[a-z]{3,255}$'))
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(6).max(1024).required(),
        role:Joi. string().min(6).max(10).optional()
    })

    const {error} = schema.validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    next();
}

const signInValidation = (req,res,next) => {
    const schema = Joi.object({
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(6).max(1024).required()
    })

    const {error} = schema.validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    next();
}

const jobValidation = (req,res,next) => {
    const schema = Joi.object({
        user_id: Joi.string().min(3).max(255).required(),
        location: Joi.string().min(3).max(255).required(),
        company_name: Joi.string().min(3).max(255).required(),
        total_employee:Joi.string().min(3).max(255).required(),
        your_name: Joi.string().min(3).max(255).required(),
        phone_number: Joi.string().min(10).max(12).required(),
        jobtitle: Joi.string().min(3).max(255).required(),
        role: Joi.string().min(3).max(255).required(),
        job_type: Joi.string().min(3).max(255).required(),
        min_experience: Joi.number().min(0).max(100).required(),
        max_experience: Joi.number().min(0).max(100).required(),
        min_salary: Joi.string().min(4).max(10).required(),
        max_salary: Joi.string().min(4).max(10).required(),
        maximum_hires: Joi.string().min(3).max(50).required(),
        description: Joi.string().min(3).required(),
        skills: Joi.array().required()
    })

    const {error} = schema.validate(req.body)
    if(error) return res.status(400).send(error.details[0].message);
    next();
}

const resumeValidation = (req,res,next) => {
    const schema = Joi.object({
        user_id: Joi.string().min(3).max(255).required(),
        first_name: Joi.string().min(3).max(255).required(),
        last_name: Joi.string().min(3).max(255).required(),
        location: Joi.string().min(3).max(255).required(),
        experience: Joi.number().min(0).max(25).required(),
        resume_headline:Joi.string().min(3).max(255).required(),
        current_salary: Joi.string().min(4).max(15).required(),
        show_salary: Joi.boolean().required(),
        email: Joi.string().min(3).max(25).email().required(),
        phone_number: Joi.string().min(10).max(12).required(),
        show_phone: Joi.boolean().required(),
        privacy: Joi.string().min(5).max(10).required(),
        course: Joi.string().min(3).max(255).required(),
        college_university: Joi.string().min(3).max(255).required(),
        college_university_location: Joi.string().min(3).max(255).required(),
        education_from_month: Joi.string().min(3).max(25).required(),
        education_from_year: Joi.string().min(4).max(4).required(),
        education_to_month: Joi.string().min(3).max(25).required(),
        education_to_year: Joi.string().min(4).max(4).required(),
        skills: Joi.array().required()
    })

    const {error} = schema.validate(req.body)
    if(error) return res.status(400).send(error.details[0].message);
    next();
}

const appliedJobValidation = (req,res,next) => {
    const schema = Joi.object({
        job_id: Joi.string().min(3).max(255).required(),
        applier_id: Joi.string().min(3).max(255).required(),
        status: Joi.string().min(5).max(10)
    })

    const {error} = schema.validate(req.body)
    if(error) return res.status(400).send(error.details[0].message);
    next();
}

const savedResumeValidation = (req,res,next) => {
    const schema = Joi.object({
        resume_id: Joi.string().min(3).max(255).required(),
        saver_id: Joi.string().min(3).max(255).required()        
    })

    const {error} = schema.validate(req.body)
    if(error) return res.status(400).send(error.details[0].message);
    next();
}

module.exports.signUpValidation = signUpValidation;
module.exports.signInValidation = signInValidation;
module.exports.jobValidation = jobValidation;
module.exports.resumeValidation = resumeValidation;
module.exports.appliedJobValidation = appliedJobValidation;
module.exports.savedResumeValidation = savedResumeValidation;