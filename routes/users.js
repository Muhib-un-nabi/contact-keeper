const express = require('express');
const router = express.Router();

// @route  POST api/suers
// @dssec  Register a user
// @acss   Public
router.post('/', (req, res) => {
	res.send('Register a User');
});

module.exports = router;
