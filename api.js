// Backend API for User Management
// This module provides REST API endpoints for user administration

const UserSystem = require('./models/UserSystem');
const userSystem = new UserSystem();

// Mock data stores for roles, corps, and Categories_grade
const roles = [
	{ id: 1, nom: 'admin', description: 'Administrator with full access' },
	{ id: 2, nom: 'user', description: 'Regular user with limited access' }
];

const corps = [
	{ id: 1, nom: 'Corps 1', code: 'C001', description: 'Premier corps' },
	{ id: 2, nom: 'Corps 2', code: 'C002', description: 'Deuxième corps' },
	{ id: 3, nom: 'Corps 3', code: 'C003', description: 'Troisième corps' }
];

const categoriesGrade = [
	{ id: 1, nom: 'Grade A', code: 'GA', niveau: 1, description: 'Grade niveau A' },
	{ id: 2, nom: 'Grade B', code: 'GB', niveau: 2, description: 'Grade niveau B' },
	{ id: 3, nom: 'Grade C', code: 'GC', niveau: 3, description: 'Grade niveau C' }
];

// Middleware to check if user is admin
function requireAdmin(req, res, next) {
	// In a real application, this would check the JWT token or session
	const isAdmin = req.headers['x-user-role'] === 'admin';
	
	if (!isAdmin) {
		return res.status(403).json({
			success: false,
			error: 'Access denied. Admin privileges required.'
		});
	}
	
	next();
}

// Validate if role exists
function validateRole(roleId) {
	return roles.some(role => role.id === parseInt(roleId));
}

// Validate if corps exists
function validateCorps(corpsId) {
	if (!corpsId) return true; // Optional field
	return corps.some(c => c.id === parseInt(corpsId));
}

// Validate if Categories_grade exists
function validateCategoriesGrade(gradeId) {
	if (!gradeId) return true; // Optional field
	return categoriesGrade.some(g => g.id === parseInt(gradeId));
}

// API Routes Handler
const apiRoutes = {
	// POST /admin/users - Create a new user
	createUser: (req, res) => {
		try {
			const { matricule, mot_de_passe, id_role, id_corps, id_Categories_grade } = req.body;

			// Validate required fields
			if (!matricule) {
				return res.status(400).json({
					success: false,
					error: 'Le matricule est obligatoire'
				});
			}

			if (!mot_de_passe) {
				return res.status(400).json({
					success: false,
					error: 'Le mot de passe est obligatoire'
				});
			}

			if (!id_role) {
				return res.status(400).json({
					success: false,
					error: 'Le rôle est obligatoire'
				});
			}

			// Validate role exists
			if (!validateRole(id_role)) {
				return res.status(400).json({
					success: false,
					error: 'Le rôle spécifié n\'existe pas'
				});
			}

			// Validate corps if provided
			if (id_corps && !validateCorps(id_corps)) {
				return res.status(400).json({
					success: false,
					error: 'Le corps spécifié n\'existe pas'
				});
			}

			// Validate Categories_grade if provided
			if (id_Categories_grade && !validateCategoriesGrade(id_Categories_grade)) {
				return res.status(400).json({
					success: false,
					error: 'La catégorie de grade spécifiée n\'existe pas'
				});
			}

			// Create user
			const userData = {
				matricule,
				mot_de_passe, // Store password in plain text as per requirement
				id_role: parseInt(id_role),
				statut: 'actif', // Default status
				id_corps: id_corps ? parseInt(id_corps) : null,
				id_Categories_grade: id_Categories_grade ? parseInt(id_Categories_grade) : null
			};

			const newUser = userSystem.createUser(userData);

			// Return success response (without password)
			const { mot_de_passe: _, ...userResponse } = newUser;
			
			return res.status(201).json({
				success: true,
				message: 'Utilisateur créé avec succès',
				user: userResponse
			});

		} catch (error) {
			// Handle duplicate matricule or other errors
			if (error.message === 'Matricule already exists') {
				return res.status(409).json({
					success: false,
					error: 'Ce matricule existe déjà'
				});
			}

			return res.status(500).json({
				success: false,
				error: error.message || 'Erreur lors de la création de l\'utilisateur'
			});
		}
	},

	// GET /admin/roles - Get all roles
	getRoles: (req, res) => {
		return res.status(200).json({
			success: true,
			roles: roles
		});
	},

	// GET /admin/corps - Get all corps
	getCorps: (req, res) => {
		return res.status(200).json({
			success: true,
			corps: corps
		});
	},

	// GET /admin/categories-grade - Get all categories grade
	getCategoriesGrade: (req, res) => {
		return res.status(200).json({
			success: true,
			categories_grade: categoriesGrade
		});
	},

	// GET /admin/users - List all users
	listUsers: (req, res) => {
		const users = userSystem.listUsers().map(user => {
			const { mot_de_passe, ...userWithoutPassword } = user;
			return userWithoutPassword;
		});

		return res.status(200).json({
			success: true,
			users: users
		});
	}
};

// Export the API routes and middleware
module.exports = {
	apiRoutes,
	requireAdmin,
	userSystem
};
