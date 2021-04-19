import React, { useReducer } from 'react';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import axios from 'axios';
import {
	ADD_CONTACT,
	DELETE_CONTACT,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACT,
	CLEAR_FILTER,
	CONTACT_ERROR,
	GET_CONTACT,
	CLEAR_CONTACT,
} from '../types';

const ContactState = (props) => {
	const initialState = {
		contacts: null,
		current: null,
		filtered: null,
		error: null,
		loading: true,
	};

	const [state, dispatch] = useReducer(contactReducer, initialState);

	// GET CONTACTS
	const getContact = async () => {
		try {
			const res = await axios.get('/api/contacts');
			dispatch({ type: GET_CONTACT, payload: res.data });
		} catch (err) {
			dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
		}
	};

	// Add Contact
	const addContact = async (contact) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		try {
			const res = await axios.post('/api/contacts', contact, config);
			dispatch({ type: ADD_CONTACT, payload: res.data });
		} catch (err) {
			dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
		}
	};

	// DELETE Contact
	const deleteContact = async (id) => {
		try {
			await axios.delete(`/api/contacts/${id}`);
			dispatch({ type: DELETE_CONTACT, payload: id });
		} catch (err) {
			dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
		}
	};

	// Updata Contact
	const updateContact = async (contact) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		try {
			const res = await axios.put(
				`/api/contacts/${contact._id}`,
				contact,
				config
			);
			dispatch({ type: UPDATE_CONTACT, payload: res.data });
		} catch (err) {
			dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
		}
	};

	// Clear Contacts
	const clearContact = () => dispatch({ type: CLEAR_CONTACT });
	// Set current Contact
	const setCurrent = (contact) => {
		dispatch({ type: SET_CURRENT, payload: contact });
	};
	// Clear current Contact
	const clearCurrent = () => {
		dispatch({ type: CLEAR_CURRENT });
	};

	// Filter Contact
	const filterContacts = (text) => {
		dispatch({ type: FILTER_CONTACT, payload: text });
	};
	// clear Filter Contact
	const clearFilter = () => {
		dispatch({ type: CLEAR_FILTER });
	};

	return (
		<ContactContext.Provider
			value={{
				...state,
				addContact,
				deleteContact,
				setCurrent,
				clearCurrent,
				updateContact,
				filterContacts,
				clearFilter,
				getContact,
				clearContact,
			}}>
			{props.children}
		</ContactContext.Provider>
	);
};

export default ContactState;
