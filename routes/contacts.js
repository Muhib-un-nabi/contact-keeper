const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { body, validationResult, check } = require('express-validator');

const User = require('../models/User');
const Contact = require('../models/Contact');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// @route  GET api/contects
// @dssec  Get All Users Contacts
// @acss   Private
router.get('/', auth, async (req, res) => {
	try {
		const contacts = await Contact.find({ user: req.user.id }).sort({
			date: -1,
		});
		res.json(contacts);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route  Post api/contects
// @dssec  Ad New Contact
// @acss   Private
router.post(
	'/',
	[auth, [check('name', 'Name Is Required').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { name, email, phone, type } = req.body;
		try {
			const newContact = new Contact({
				name,
				email,
				phone,
				type,
				user: req.user.id,
			});
			const contact = await newContact.save();
			res.json(contact);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Servre Error');
		}
	}
);

// @route  PUT api/contects/:id
// @dssec  Update Contact
// @acss   Private
router.put('/:id', auth, async (req, res) => {
	const { name, email, phone, type } = req.body;

	//build Contact Object

	const contactFields = {};
	if (name) contactFields.name = name;
	if (email) contactFields.email = email;
	if (phone) contactFields.phone = phone;
	if (type) contactFields.type = type;

	try {
		let contact = await Contact.findById(req.params.id);
		if (!contact) {
			return await res.status(404).send({ mas: 'Contact not found' });
		}
		// Make Sure User Own Contact
		if (contact.user.toString() !== req.user.id) {
			return res.status(401).json('Not Authorized');
		}
		contact = await Contact.findByIdAndUpdate(
			req.params.id,
			{
				$set: contactFields,
			},
			{
				new: true,
			}
		);
		res.json(contact);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Servre Error');
	}
});

// @route  DELETE api/contects/:id
// @dssec  Delete Contact
// @acss   Private
router.delete('/:id', auth, async (req, res) => {
	try {
		let contact = await Contact.findById(req.params.id);
		if (!contact) {
			return await res.status(404).send({ mas: 'Contact not found' });
		}
		// Make Sure User Own Contact
		if (contact.user.toString() !== req.user.id) {
			return res.status(401).json('Not Authorized');
		}
		await Contact.findByIdAndRemove(req.params.id);
		res.json({ msg: 'Contact Removed' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Servre Error');
	}
});

module.exports = router;
