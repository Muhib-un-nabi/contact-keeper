const express = require('express');
const router = express.Router();

// @route  GET api/contects
// @dssec  Get All Users Contacts
// @acss   Private
router.get('/', (req, res) => {
	res.send('Get All Users Contacts');
});

// @route  Post api/contects
// @dssec  Ad New Contact
// @acss   Private
router.post('/', (req, res) => {
	res.send('Ad New Contact');
});

// @route  PUT api/contects/:id
// @dssec  Update Contact
// @acss   Private
router.put('/:id', (req, res) => {
	res.send('Update Contact');
});

// @route  DELETE api/contects/:id
// @dssec  Delete Contact
// @acss   Private
router.delete('/:id', (req, res) => {
	res.send('Delete Contact');
});

module.exports = router;
