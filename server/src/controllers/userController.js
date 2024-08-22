const user = require('../services/user'); // Importa el servicio correctamente
const mongoose = require('mongoose'); // Importar mongoose para validación de ObjectId

async function signUp(req, res) {
	try {
		const userData = req.body;

		// Validar datos de entrada
		if (!userData || !userData.data) {
			return res.status(400).json({ error: 'Invalid user data' });
		}

		const newUser = await user.createUser(userData);

		res.status(201).json({
			message: 'User signed up and registered successfully',
			user: newUser,
		});
	} catch (error) {
		console.error('Error during sign-up:', error);
		res.status(500).json({ error: 'Internal server error: ' + error.message });
	}
}

async function getUsers(req, res) {
	try {
		const users = await user.getUsers();

		res.status(200).json(users);
	} catch (error) {
		console.error('Error retrieving users:', error);
		res.status(500).json({ error: 'Internal server error: ' + error.message });
	}
}

async function deleteUser(req, res) {
	try {
		const userId = req.params.id;

		// Validar que userId es un ObjectId válido
		if (!mongoose.Types.ObjectId.isValid(userId)) {
			return res.status(400).json({ error: 'Invalid user ID' });
		}

		const result = await user.deleteUserById(userId);

		if (result.deletedCount === 1) {
			res.status(200).json({ message: 'User deleted successfully' });
		} else {
			res.status(404).json({ error: 'User not found' });
		}
	} catch (error) {
		console.error('Error deleting user:', error);
		res.status(500).json({ error: 'Internal server error: ' + error.message });
	}
}

async function deleteUsersWithoutClerkId(req, res) {
	try {
		const result = await user.deleteUsersWithoutClerkId();

		res.status(200).json({
			message: `Deleted ${result.deletedCount} users without clerkId.`,
		});
	} catch (error) {
		console.error('Error deleting users without clerkId:', error);
		res.status(500).json({ error: 'Internal server error: ' + error.message });
	}
}

module.exports = {
	signUp,
	getUsers,
	deleteUser,
	deleteUsersWithoutClerkId,
};
