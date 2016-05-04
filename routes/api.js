var express = require('express');
var router = express.Router();

/* GET users listing. */
router.use('/tenants', require('./tenants'))
router.use('/properties', require('./properties'))

module.exports = router;
