var express = require('express');
require('./db');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');


var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var jobRouter = require('./routes/job');
var resumeRouter = require('./routes/resume');
var appliedJobRouter = require('./routes/appliedJob');
var savedResumeRouter = require('./routes/savedResume')
var app = express();

app.use(cors({
    exposedHeaders: ['auth_token'],
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', authRouter);
app.use('/api/jobs', jobRouter);
app.use('/api/resumes', resumeRouter);
app.use('/api/applied-jobs',appliedJobRouter);
app.use('/api/saved-resumes',savedResumeRouter);

module.exports = app;
