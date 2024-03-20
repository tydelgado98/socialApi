const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/students/:studentId
router.route('/:userId').get(getSingleUser)

// /api/students/:studentId/assignments
router.route('/:userId/thoughts')

// /api/users/:userId/assignments/:assignmentId


module.exports = router;
