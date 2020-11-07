var router = require('express').Router();
const Job = require('../models/jobModel');
const Resume = require('../models/resumeModel');

const { jobValidation } = require("../validators/bodyValidator");

const varify = require('../varifyToken');
const varifyRecruiter = require('../verifyRecruiter');

/* POST Save a job  */
router.post('/', varify , varifyRecruiter , jobValidation, async (req, res, next) => {

  const job = new Job({
    user_id: req.body.user_id, 
    location:req.body.location,
    company_name:req.body.company_name,
    total_employee:req.body.total_employee,
    your_name:req.body.your_name,
    phone_number:req.body.phone_number,
    jobtitle:req.body.jobtitle,
    role:req.body.role,
    job_type:req.body.job_type,
    min_experience:req.body.min_experience,
    max_experience:req.body.max_experience,
    min_salary:req.body.min_salary,
    max_salary:req.body.max_salary,
    maximum_hires:req.body.maximum_hires,
    description:req.body.description,
    skills:req.body.skills
  });

  try {
    const savedJob = await job.save();
    res.status(200).send(savedJob._id);
  } catch (error) {
    res.status(400).send(error);
  }
});

/* GET get jobs  */
router.get('/', varify , async (req, res, next) => {
  const { jobTitle , location , company_name , role , jobId , recruiter_Id} = req.query;
  
  function checkSkills(skills,jobTitle){
    for (const key in skills) {
      if(skills[key] === jobTitle)
      return true;
    }
    return false;
  }

  if(!jobTitle && location){
    try {
      const jobs = await Job.find({ location :location.toLowerCase()});
      res.status(200).send(jobs);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  else if(jobTitle && !location){
    try {
      let jobArray = [];
      const jobs = await Job.find();
      jobs.map((job,index)=>{
      if(job.jobtitle.toLowerCase().includes(jobTitle.toLowerCase()) || job.company_name.toLowerCase().includes(jobTitle.toLowerCase()) || job.description.toLowerCase().includes(jobTitle.toLowerCase()) || checkSkills(job.skills,jobTitle)) {
        jobArray.push(job)
      }
      })
      res.status(200).send(jobArray);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  
  else if(jobTitle && location){
    try {
      let jobArray = [];
      const jobs = await Job.find();
      jobs.map((job,index)=>{
      if(job.jobtitle.toLowerCase().includes(jobTitle.toLowerCase()) || job.company_name.toLowerCase().includes(jobTitle.toLowerCase()) && job.location.toLowerCase().includes(location.toLowerCase())) {
        jobArray.push(job)
      }
      })
      res.status(200).send(jobArray);
    } catch (error) {
      res.status(500).send(error);
    }
  }

 else if(company_name){
    try {
      const jobs = await Job.find({ company_name : company_name.toLowerCase() });
      res.status(200).send(jobs);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  else if(role){
    // try {
    //   const jobs = await Job.find({ role : role.toLowerCase() });
    //   res.status(200).send(jobs);
    // } catch (error) {
    //   res.status(500).send(error);
    // }
    try {
      let jobArray = [];
      const jobs = await Job.find();
      jobs.map((job)=>{
      if(job.role.toLowerCase().includes(role.toLowerCase()) || job.jobtitle.toLowerCase().includes(role.toLowerCase()) ) {
        jobArray.push(job)
      }
      })
      res.status(200).send(jobArray);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  else if(jobId){
    try {
      const job = await Job.findById(jobId);
      res.status(200).send(job);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  else if(recruiter_Id){
    try {
      const jobs = await Job.find({ user_id : recruiter_Id });
      res.status(200).send(jobs);
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.send([]);
  }

});

//GET my-jobs
router.get('/my-jobs',varify, async (req,res,next)=>{
  const user_id = req.user._id;
try{
  let jobArray = [];
  const resume = await Resume.findOne({user_id:user_id});
  const user_skills = resume.skills;
  const jobs = await Job.find();

  let skip = false;
  jobs.map((job) => {
    skip = false;
    job.skills.map((job_skill) => {
      if(!skip){
        user_skills.map((user_skill)=>{
          if(!skip){
            if(user_skill.toLowerCase() === job_skill.toLowerCase()){
            jobArray.push(job)
            skip = true;
            }
          }
        })
      }
    })
  })

  res.status(200).send(jobArray);
}catch(error){
  res.status(500).send(error);
}
})

module.exports = router;