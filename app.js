const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const myprofileRouter = require('./routes/myprofile');
const registerRouter = require('./routes/register');
const ourTeamRouter = require('./routes/our-team');
const viewDoctorsRouter = require('./routes/viewdoctors');
const adminviewdoctorRouter = require('./routes/adminviewdoctor');
const createDoctorRouter = require('./routes/create-doctor');
const patientViewTestsRouter = require('./routes/patient-viewtests');
const updateProfileRouter = require('./routes/update-profile');



const app = express();
app.locals.title = "MoCA Web";
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: "La frase que querais",
  resave: false,
  saveUninitialized: true
}));
app.use((req,res,next) => {
  const message = req.session.message;
  const error = req.session.error;
  delete req.session.message;
  delete req.session.error;
  res.locals.message = "";
  res.locals.error = "";
  if(message) res.locals.message = `<p>${message}</p>`;
  if(error) res.locals.error = `<p>${error}</p>`;
  next();
});

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/myprofile', restricted, myprofileRouter);
app.use('/logout', (req,res) =>{
  req.session.destroy(); //se elimina el objeto session
  res.redirect("/");
});
app.use('/our-team', ourTeamRouter);
app.use('/viewdoctors', viewDoctorsRouter);
app.use('/adminviewdoctor', adminviewdoctorRouter);
app.use('/create-doctor', createDoctorRouter);
app.use('/patient-viewtests', patientViewTestsRouter);
app.use('/update-profile', updateProfileRouter);

function restricted(req, res, next){
  if(req.session.user){
    next();
  } else {
    res.redirect("login");
  }
}

//formatting dates
const { format } = require('date-fns');

app.locals.formatDate = (date) => {
  return format(new Date(date), 'dd MMM yyyy');
};

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
