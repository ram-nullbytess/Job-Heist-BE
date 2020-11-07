var router = require('express').Router();
const AppliedJob = require('../models/appliedJobModel');

const { appliedJobValidation } = require("../validators/bodyValidator");

const varify = require('../varifyToken');
const varifyJobseeker = require('../verifyJobseeker');

/* POST Save a appliedJob  */
router.post('/', varify , varifyJobseeker , appliedJobValidation, async (req, res, next) => {
  
    const alreadyApplied = await AppliedJob.findOne({
        job_id: req.body.job_id, 
        applier_id:req.body.applier_id
      })

    if (alreadyApplied) return res.status(400).send('already applied')

    const appliedJob = new AppliedJob({
        job_id: req.body.job_id, 
        applier_id:req.body.applier_id
    });

  try {
    const savedAppliedJob = await appliedJob.save();
    res.status(200).send(savedAppliedJob._id);
  } catch (error) {
    res.status(500).send(error);
  }
});

/* GET get job appliers/applied jobs */ 
router.get('/:_id', varify, async (req, res, next) => {
  const {  _id } = req.params;
  if(req.user.role === 'recruiter'){
    try {
      const appliers = await AppliedJob.find({ job_id : _id });
      res.status(200).send(appliers);
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    try {
      const appliedJobs = await AppliedJob.find({ applier_id : _id });
      res.status(200).send(appliedJobs);
    } catch (error) {
      res.status(500).send(error);
    }
  } 
});

router.put('/:id/:status',async  (req,res,next) => {
  const {id,status} = req.params;
  try {
    const updated = await AppliedJob.findByIdAndUpdate(id,{status:status});
    res.status(200).send('updated') 
  } catch (error) {
    res.status(500).send(error);
  }
})

module.exports = router;