var router = require('express').Router();
const SavedResume = require('../models/savedResumeModel');

const { savedResumeValidation } = require("../validators/bodyValidator");

const varify = require('../varifyToken');
const varifyRecruiter = require('../verifyRecruiter');

/* POST Save a resume  */
router.post('/', varify , varifyRecruiter , savedResumeValidation, async (req, res, next) => {
  
    const alreadySaved = await SavedResume.findOne({
        resume_id: req.body.resume_id, 
        saver_id:req.body.saver_id
      })

    if (alreadySaved) return res.status(400).send('already-saved')

    const savedResume = new SavedResume({
        resume_id: req.body.resume_id, 
        saver_id:req.body.saver_id
    });

  try {
    await savedResume.save();
    res.status(200).send('saved');
  } catch (error) {
    res.status(400).send(error);
  }
});

/* GET get saved resumes */ 
router.get('/:_id', varify, varifyRecruiter, async (req, res, next) => {
  const {  _id } = req.params;

    try {
      const savedResumes = await SavedResume.find({ saver_id : _id });
      res.status(200).send(savedResumes);
    } catch (error) {
      res.status(500).send(error);
    }
  
});

module.exports = router;