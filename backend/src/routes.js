const express = require('express');
const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');
const StudentController = require('./app/controllers/StudentController');
const EnrollmentController = require('./app/controllers/EnrollmentController');
const UserHelpOrderController = require('./app/controllers/UserHelpOrderController');
const StudentHelpOrderController = require('./app/controllers/StudentHelpOrderController');
const CheckinController = require('./app/controllers/CheckinController');
const PlanController = require('./app/controllers/PlanController');
const authMiddleware = require('./app/middlewares/auth');
const AdminMiddleware = require('./app/middlewares/admin');

const routes = express.Router();

// sem verificacao
routes.post('/user', UserController.store);
routes.post('/session', SessionController.store);
routes.post('/students/:id/checkins', CheckinController.store);
routes.get('/students/:id/checkins', CheckinController.index);
routes.post('/students/:id/help-orders', StudentHelpOrderController.store);
routes.get('/students/:id/help-orders', StudentHelpOrderController.index);

// verificacao admin
routes.use(authMiddleware);
routes.use(AdminMiddleware);

routes.post('/student', StudentController.store);
routes.put('/student', StudentController.update);

routes.post('/plan', PlanController.store);
routes.get('/plan', PlanController.index);
routes.put('/plan/:id', PlanController.update);
routes.delete('/plan/:id', PlanController.delete);

routes.post('/enrollment', EnrollmentController.store);
routes.get('/enrollment', EnrollmentController.index);
routes.put('/enrollment/:id', EnrollmentController.update);
routes.delete('/enrollment/:id', EnrollmentController.delete);

routes.post('/enrollment', EnrollmentController.store);
routes.get('/enrollment', EnrollmentController.index);
routes.put('/enrollment/:id', EnrollmentController.update);
routes.delete('/enrollment/:id', EnrollmentController.delete);

routes.post('/help-orders/:id/answer', UserHelpOrderController.store);
routes.get('/help-orders/answer', UserHelpOrderController.index);


module.exports = routes;
