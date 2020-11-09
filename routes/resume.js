var router = require('express').Router();
const Resume = require('../models/resumeModel');

const { resumeValidation } = require("../validators/bodyValidator");

const varify = require('../varifyToken');
const varifyJobseeker = require('../verifyJobseeker');

/* POST Save a Resume  */
router.post('/', varify , varifyJobseeker , resumeValidation, async (req, res, next) => {

  const resume = new Resume({
         user_id: req.body.user_id,
         first_name: req.body.first_name,
         last_name: req.body.last_name,
         location: req.body.location,
         experience: req.body.experience,
         resume_headline: req.body.resume_headline,
         current_salary: req.body.current_salary,
         show_salary: req.body.show_salary,
         email: req.body.email,
         phone_number: req.body.phone_number,
         show_phone: req.body.show_phone,
         privacy: req.body.privacy,
         course: req.body.course,
         college_university: req.body.college_university,
         college_university_location: req.body.college_university_location,
         education_to_year: req.body.education_to_year,
         education_from_month: req.body.education_from_month,
         education_from_year: req.body.education_from_year,
         education_to_month: req.body.education_to_month,
         skills: req.body.skills
  });

  try {
    const savedResume = await resume.save();
    res.status(200).send(savedResume._id);
  } catch (error) {
    res.status(400).send(error);
  }
});

/* GET get a Resume  */
router.get('/:_id', varify , async (req, res, next) => {
  const {resume_id} = req.query;
  if(req.user.role === 'recruiter'){
    if(resume_id){
      try {
        const resume = await Resume.findById(req.params._id);
        res.status(200).send(resume);
      } catch (error) {
          res.status(500).send(error);
      }
    } else {
      try {
        const resume = await Resume.findOne({ user_id: req.params._id });
        res.status(200).send(resume);
      } catch (error) {
          res.status(500).send(error);
      }
    }
  } else { 
    try {
      const resumeExist = await Resume.findOne({ user_id: req.params._id });
      if (resumeExist) return res.status(200).send(resumeExist.privacy);
      else
      res.status(200).send(false);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  
});

/* GET get resumes  */
router.get('/', varify , async (req, res, next) => {
  const { resumeTitle , location } = req.query;
  if(!resumeTitle && location){
    try {
      const resumes = await Resume.find({ location :location.toLowerCase()});
      res.status(200).send(resumes);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  else if(resumeTitle && !location){
    try {
      let resumeArray = [];
      const resumes = await Resume.find();
      resumes.map((resume)=>{
        if(resume.resume_headline.toLowerCase().includes(resumeTitle.toLowerCase()) || 
           resume.course.toLowerCase().includes(resumeTitle.toLowerCase())
        ) {
          resumeArray.push(resume);
        }else if(resume.skills.length){
          resume.skills.map((skill)=>{
            if(skill.toLowerCase() === resumeTitle.toLowerCase()) {
            resumeArray.push(resume);
            }
          })
        }
      })
      res.status(200).send(resumeArray);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  
  else if(resumeTitle && location){
    try {
      let resumeArray = [];
      const resumes = await Resume.find();
      resumes.map((resume)=>{
        if(resume.location.toLowerCase().includes(location.toLowerCase())){
            if( resume.resume_headline.toLowerCase().includes(resumeTitle.toLowerCase()) || 
                resume.course.toLowerCase().includes(resumeTitle.toLowerCase())
            ) {
              resumeArray.push(resume);
            }else if( resume.skills.length){
              resume.skills.map((skill)=>{
                if(skill.toLowerCase().includes(resumeTitle.toLowerCase())) {
                resumeArray.push(resume);
                }
              })
            }
        }
      })
      res.status(200).send(resumeArray);
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.send([]);
  }

});

router.put('/resume-privacy', async (req,res,next) => {
try {
  const user_id = req.body.user_id;
  const privacy = req.body.privacy;
  const updatedPrivacy = await Resume.updateOne({user_id:user_id},{privacy : privacy});
  res.status(200).send(updatedPrivacy);
}catch (error){
  res.status(500).send(error);
}
})
module.exports = router;
