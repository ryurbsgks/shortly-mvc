const express = require('express');
const router = express.Router();
const controllers = require('../controllers/links');

/* GET links listing. */
// router.get('/', function (req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/', controllers.get);
router.post('/', controllers.post);
router.get('/:id', controllers.redirect);

module.exports = router;
