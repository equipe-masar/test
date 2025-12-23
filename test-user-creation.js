// Test suite for User Creation Feature
// Tests for UserSystem model and API

const UserSystem = require('./models/UserSystem');

// Test utilities
function assert(condition, message) {
	if (!condition) {
		throw new Error(`Assertion failed: ${message}`);
	}
}

function assertThrows(fn, expectedError, message) {
	try {
		fn();
		throw new Error(`Expected function to throw error: ${message}`);
	} catch (error) {
		if (!error.message.includes(expectedError)) {
			throw new Error(`Expected error containing "${expectedError}", got "${error.message}"`);
		}
	}
}

// Test Suite
console.log('Starting User Creation Tests...\n');

let passedTests = 0;
let failedTests = 0;

function runTest(testName, testFn) {
	try {
		testFn();
		console.log(`✓ ${testName}`);
		passedTests++;
	} catch (error) {
		console.log(`✗ ${testName}`);
		console.log(`  Error: ${error.message}`);
		failedTests++;
	}
}

// Test 1: Create user with all required fields
runTest('Should create user with all required fields', () => {
	const userSystem = new UserSystem();
	
	const userData = {
		matricule: 'MAT001',
		mot_de_passe: 'password123',
		id_role: 1,
		id_corps: 1,
		id_Categories_grade: 1
	};
	
	const user = userSystem.createUser(userData);
	
	assert(user.id !== null, 'User should have an ID');
	assert(user.matricule === 'MAT001', 'User should have correct matricule');
	assert(user.mot_de_passe === 'password123', 'User should have password');
	assert(user.id_role === 1, 'User should have role');
	assert(user.statut === 'actif', 'User should have default status "actif"');
	assert(user.id_corps === 1, 'User should have corps');
	assert(user.id_Categories_grade === 1, 'User should have grade category');
	assert(user.createdAt !== null, 'User should have createdAt timestamp');
});

// Test 2: Create user without optional fields
runTest('Should create user without optional fields (corps, grade)', () => {
	const userSystem = new UserSystem();
	
	const userData = {
		matricule: 'MAT002',
		mot_de_passe: 'password456',
		id_role: 2
	};
	
	const user = userSystem.createUser(userData);
	
	assert(user.id !== null, 'User should have an ID');
	assert(user.matricule === 'MAT002', 'User should have correct matricule');
	assert(user.statut === 'actif', 'User should have default status "actif"');
});

// Test 3: Matricule uniqueness constraint
runTest('Should fail when creating user with duplicate matricule', () => {
	const userSystem = new UserSystem();
	
	// Create first user
	userSystem.createUser({
		matricule: 'MAT003',
		mot_de_passe: 'pass1',
		id_role: 1
	});
	
	// Try to create second user with same matricule
	assertThrows(
		() => userSystem.createUser({
			matricule: 'MAT003',
			mot_de_passe: 'pass2',
			id_role: 2
		}),
		'Matricule already exists',
		'Should throw duplicate matricule error'
	);
});

// Test 4: Required field validation - matricule
runTest('Should fail when matricule is missing', () => {
	const userSystem = new UserSystem();
	
	assertThrows(
		() => userSystem.createUser({
			mot_de_passe: 'password',
			id_role: 1
		}),
		'Matricule is required',
		'Should throw matricule required error'
	);
});

// Test 5: Required field validation - mot_de_passe
runTest('Should fail when mot_de_passe is missing', () => {
	const userSystem = new UserSystem();
	
	assertThrows(
		() => userSystem.createUser({
			matricule: 'MAT004',
			id_role: 1
		}),
		'Mot de passe is required',
		'Should throw password required error'
	);
});

// Test 6: Required field validation - id_role
runTest('Should fail when id_role is missing', () => {
	const userSystem = new UserSystem();
	
	assertThrows(
		() => userSystem.createUser({
			matricule: 'MAT005',
			mot_de_passe: 'password'
		}),
		'Role is required',
		'Should throw role required error'
	);
});

// Test 7: Password is stored in plain text
runTest('Should store password in plain text (not hashed)', () => {
	const userSystem = new UserSystem();
	
	const userData = {
		matricule: 'MAT006',
		mot_de_passe: 'plaintext123',
		id_role: 1
	};
	
	const user = userSystem.createUser(userData);
	
	assert(user.mot_de_passe === 'plaintext123', 'Password should be stored as plain text');
});

// Test 8: Default status is 'actif'
runTest('Should set default status to "actif"', () => {
	const userSystem = new UserSystem();
	
	const user = userSystem.createUser({
		matricule: 'MAT007',
		mot_de_passe: 'password',
		id_role: 1
	});
	
	assert(user.statut === 'actif', 'Default status should be "actif"');
});

// Test 9: Timestamps are generated automatically
runTest('Should automatically generate created_at timestamp', () => {
	const userSystem = new UserSystem();
	
	const beforeCreation = new Date();
	
	const user = userSystem.createUser({
		matricule: 'MAT008',
		mot_de_passe: 'password',
		id_role: 1
	});
	
	const afterCreation = new Date();
	
	assert(user.createdAt !== null, 'Should have createdAt timestamp');
	assert(user.createdAt >= beforeCreation, 'createdAt should be after or equal to beforeCreation');
	assert(user.createdAt <= afterCreation, 'createdAt should be before or equal to afterCreation');
});

// Test 10: getUserByMatricule function
runTest('Should retrieve user by matricule', () => {
	const userSystem = new UserSystem();
	
	userSystem.createUser({
		matricule: 'MAT009',
		mot_de_passe: 'password',
		id_role: 1
	});
	
	const user = userSystem.getUserByMatricule('MAT009');
	
	assert(user !== null, 'Should find user');
	assert(user.matricule === 'MAT009', 'Should return correct user');
});

// Test 11: getUserByMatricule returns null for non-existent matricule
runTest('Should return null for non-existent matricule', () => {
	const userSystem = new UserSystem();
	
	const user = userSystem.getUserByMatricule('NONEXISTENT');
	
	assert(user === null, 'Should return null for non-existent matricule');
});

// Test 12: Multiple users can be created
runTest('Should create multiple users successfully', () => {
	const userSystem = new UserSystem();
	
	const user1 = userSystem.createUser({
		matricule: 'MAT010',
		mot_de_passe: 'pass1',
		id_role: 1
	});
	
	const user2 = userSystem.createUser({
		matricule: 'MAT011',
		mot_de_passe: 'pass2',
		id_role: 2
	});
	
	assert(user1.id !== user2.id, 'Users should have different IDs');
	assert(user1.matricule !== user2.matricule, 'Users should have different matricules');
	
	const allUsers = userSystem.listUsers();
	assert(allUsers.length === 2, 'Should have 2 users');
});

// Test 13: Corps and Categories_grade persistence
runTest('Should persist corps and Categories_grade correctly', () => {
	const userSystem = new UserSystem();
	
	const user = userSystem.createUser({
		matricule: 'MAT012',
		mot_de_passe: 'password',
		id_role: 1,
		id_corps: 2,
		id_Categories_grade: 3
	});
	
	assert(user.id_corps === 2, 'Corps should be persisted');
	assert(user.id_Categories_grade === 3, 'Categories_grade should be persisted');
	
	// Verify persistence by retrieving user
	const retrievedUser = userSystem.getUserById(user.id);
	assert(retrievedUser.id_corps === 2, 'Corps should be persisted and retrievable');
	assert(retrievedUser.id_Categories_grade === 3, 'Categories_grade should be persisted and retrievable');
});

// Print test results
console.log('\n' + '='.repeat(50));
console.log('Test Results:');
console.log(`Passed: ${passedTests}`);
console.log(`Failed: ${failedTests}`);
console.log(`Total: ${passedTests + failedTests}`);
console.log('='.repeat(50));

// Exit with appropriate code
if (failedTests > 0) {
	process.exit(1);
} else {
	console.log('\n✓ All tests passed!');
	process.exit(0);
}
