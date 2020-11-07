var router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const User = require('../models/userModel');
const {
  signUpValidation,
  signInValidation
} = require("../validators/bodyValidator");
const varify = require('../varifyToken');

/* POST users sign-up */
router.post('/sign-up', signUpValidation, async (req, res, next) => {

  const emailExist = await User.findOne({
    email: req.body.email
  })
  if (emailExist) return res.status(400).send('email already exists')

  var salt = bcrypt.genSaltSync(10);
  var hashedPassword = bcrypt.hashSync(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  })
  try {
    const savedUser = await user.save();
    // res.status(200).send({_id:savedUser._id});
    res.status(200).send(savedUser.email);
  } catch (error) {
    res.status(400).send(error);
  }
});

/* POST users sign-in */
router.post('/sign-in', signInValidation, async (req, res, next) => {
  const user = await User.findOne({
    email: req.body.email
  })

  if (!user) return res.status(400).send('email or password is wrong')
  const validPass = bcrypt.compareSync(req.body.password, user.password);
  if (!validPass) return res.status(400).send('email or password is wrong')

  // create and assign jwt token for old users
  if (user.role !== "null") {
    const token =  jwt.sign({
      role: user.role,
      date: user.date,
      _id: user._id,
      name: user.name,
      email: user.email
    }, process.env.TOKEN_SECRET)
    
    res.status(200).header('auth_token', token).send({
      role: user.role,
      date: user.date,
      _id: user._id,
      name: user.name,
      email: user.email,
      __v: user.__v
    });
  } else {
    res.status(200).send({
      role: user.role,
      date: user.date,
      _id: user._id,
      name: user.name,
      email: user.email,
      __v: user.__v
    });
  }

});

/* PUT users role */
router.put('/role', async (req, res, next) => {

  const {
    role,
    _id
  } = req.body;
  try {
    const user = await User.findByIdAndUpdate(_id, {
      role: role
    });

    // create and assign jwt token for new users
    const token = jwt.sign({
      role: role,
      date: user.date,
      _id: user._id,
      name: user.name,
      email: user.email
    }, process.env.TOKEN_SECRET)
    res.status(200).header('auth_token', token).send(role);
  } catch (error) {
    res.status(400).send(error.name)
  }
})

/* GET get saved resumes */ 
router.get('/jwt-varify', varify, async (req, res, next) => {
    try {
      res.status(200).send(req.user);
    } catch (error) {
      res.status(500).send(error);
    }
});


module.exports = router;