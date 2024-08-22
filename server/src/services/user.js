const mongoose = require('mongoose');
const User = require('../models/User');

async function createUser(userData) {
	try {
		const {
			id: clerkId,
			email_addresses,
			first_name,
			last_name,
			username,
		} = userData.data;
		const email_address = email_addresses[0].email_address;

		// Create a new user document
		const user = new User({
			clerkId,
			email_address,
			first_name,
			last_name,
			username,
		});

		// Save the user document to the database
		return await user.save();
	} catch (error) {
		throw new Error('Error creating user: ' + error.message);
	}
}

async function getUsers() {
	try {
		return await User.find({});
	} catch (error) {
		throw new Error('Error retrieving users: ' + error.message);
	}
}

async function deleteUserById(userId) {
	try {
		// Use mongoose.Types.ObjectId to ensure userId is a valid ObjectId
		return await User.deleteOne({ _id: mongoose.Types.ObjectId(userId) });
	} catch (error) {
		throw new Error('Error deleting user: ' + error.message);
	}
}

async function deleteUsersWithoutClerkId() {
	try {
		return await User.deleteMany({ clerkId: { $exists: false } });
	} catch (error) {
		throw new Error('Error deleting users without clerkId: ' + error.message);
	}
}

module.exports = {
	createUser,
	getUsers,
	deleteUserById,
	deleteUsersWithoutClerkId,
};
