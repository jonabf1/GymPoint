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
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.post('/students/:id/checkins', CheckinController.store);
routes.get('/students/:id/checkins', CheckinController.index);

routes.post('/students/:id/help-orders', StudentHelpOrderController.store);
routes.get('/students/:id/help-orders', StudentHelpOrderController.index);

routes.use(authMiddleware);
routes.use(AdminMiddleware);

routes.post('/students', StudentController.store);
routes.get('/students', StudentController.index);

routes.post('/plans', PlanController.store);
routes.get('/plans', PlanController.index);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

routes.post('/enrollments', EnrollmentController.store);
routes.get('/enrollments', EnrollmentController.index);
routes.put('/enrollments/:id', EnrollmentController.update);
routes.delete('/enrollments/:id', EnrollmentController.delete);

routes.post('/help-orders/:id/answers', UserHelpOrderController.store);
routes.get('/help-orders/answers', UserHelpOrderController.index);

module.exports = routes;
