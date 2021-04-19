import React, { useEffect, useRef, useContext } from 'react';
import ContactContext from '../../context/contact/contactContext';
const ContactFilter = () => {
	const contactContext = useContext(ContactContext);
	const { clearFilter, filterContacts, filtered } = contactContext;
	const text = useRef('');

	useEffect(() => {
		if (filtered === null) {
			text.current.value = '';
		}
	});

	const onChange = (e) => {
		if (text.current.value !== '') {
			filterContacts(e.target.value);
		} else {
			clearFilter();
		}
	};

	return (
		<form>
			<input
				type='text'
				ref={text}
				placeholder='Filtre Contacts...'
				onChange={onChange}
			/>
		</form>
	);
};

export default ContactFilter;
