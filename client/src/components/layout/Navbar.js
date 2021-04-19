import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';

const Navbar = ({ title, icon }) => {
	const authContext = useContext(AuthContext);
	const contactContext = useContext(ContactContext);

	const { isAuthenticated, user, logout } = authContext;
	const { clearContact } = contactContext;

	const onLogout = () => {
		logout();
		clearContact();
	};

	const authLink = (
		<>
			<li>Hello {user && user.name}</li>
			<li>
				<a onClick={onLogout} href='#!'>
					<i className='fas fa-sign-out-alt' />
					<span className='hide-sm'> Logout</span>
				</a>
			</li>
		</>
	);

	const gustLink = (
		<>
			<li>
				<Link to='/register'>Register</Link>
			</li>
			<li>
				<Link to='/login'>Login</Link>
			</li>
		</>
	);

	return (
		<div className='navbar bg-primary'>
			<h1>
				<i className={icon} /> {title}
			</h1>
			<ul>
				{isAuthenticated ? authLink : gustLink}
				{/* <li>
					<Link to='/'>Home</Link>
				</li>
				<li>
					<Link to='/about'>About</Link>
				</li> */}
			</ul>
		</div>
	);
};

Navbar.prototype = {
	title: PropTypes.string.isRequired,
	icon: PropTypes.string,
};
Navbar.defaultProps = {
	title: 'Contact Keeper',
	icon: 'fas fa-id-card-alt',
};

export default Navbar;
