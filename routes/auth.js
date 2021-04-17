const express = require('express');
const router = express.Router();

// @route  GET api/auth
// @dssec  GET logged in User
// @acss   Private
router.get('/', (req, res) => {
	res.send(' GET logged in User');
});

// @route  POSST api/auth
// @dssec  Auth User & get Tocken
// @acss   Private
router.post('/', (req, res) => {
	res.send('Log In User');
});

module.exports = router;
