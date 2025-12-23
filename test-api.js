// Test API endpoints
const { apiRoutes, requireAdmin, userSystem } = require('./api');

console.log('Testing API endpoints...\n');

// Mock request and response objects
function createMockReq(body = {}, headers = {}) {
	return {
		body,
		headers
	};
}

function createMockRes() {
	const res = {
		statusCode: null,
		data: null,
		status(code) {
			this.statusCode = code;
			return this;
		},
		json(data) {
			this.data = data;
			return this;
		}
	};
	return res;
}

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

// Test 1: Create user successfully
runTest('API: Should create user with valid data', () => {
	const req = createMockReq({
		matricule: 'API001',
		mot_de_passe: 'password123',
		id_role: 1,
		id_corps: 1,
		id_Categories_grade: 1
	});
	const res = createMockRes();
	
	apiRoutes.createUser(req, res);
	
	if (res.statusCode !== 201) {
		throw new Error(`Expected status 201, got ${res.statusCode}`);
	}
	if (!res.data.success) {
		throw new Error('Expected success to be true');
	}
	if (res.data.user.matricule !== 'API001') {
		throw new Error('User data mismatch');
	}
});

// Test 2: Fail on missing matricule
runTest('API: Should fail when matricule is missing', () => {
	const req = createMockReq({
		mot_de_passe: 'password123',
		id_role: 1
	});
	const res = createMockRes();
	
	apiRoutes.createUser(req, res);
	
	if (res.statusCode !== 400) {
		throw new Error(`Expected status 400, got ${res.statusCode}`);
	}
	if (res.data.success !== false) {
		throw new Error('Expected success to be false');
	}
});

// Test 3: Fail on duplicate matricule
runTest('API: Should fail on duplicate matricule', () => {
	// Create first user
	const req1 = createMockReq({
		matricule: 'API002',
		mot_de_passe: 'password123',
		id_role: 1
	});
	const res1 = createMockRes();
	apiRoutes.createUser(req1, res1);
	
	// Try to create second user with same matricule
	const req2 = createMockReq({
		matricule: 'API002',
		mot_de_passe: 'password456',
		id_role: 2
	});
	const res2 = createMockRes();
	apiRoutes.createUser(req2, res2);
	
	if (res2.statusCode !== 409) {
		throw new Error(`Expected status 409, got ${res2.statusCode}`);
	}
});

// Test 4: Validate role
runTest('API: Should fail with invalid role', () => {
	const req = createMockReq({
		matricule: 'API003',
		mot_de_passe: 'password123',
		id_role: 999 // Invalid role ID
	});
	const res = createMockRes();
	
	apiRoutes.createUser(req, res);
	
	if (res.statusCode !== 400) {
		throw new Error(`Expected status 400, got ${res.statusCode}`);
	}
});

// Test 5: Validate corps
runTest('API: Should fail with invalid corps', () => {
	const req = createMockReq({
		matricule: 'API004',
		mot_de_passe: 'password123',
		id_role: 1,
		id_corps: 999 // Invalid corps ID
	});
	const res = createMockRes();
	
	apiRoutes.createUser(req, res);
	
	if (res.statusCode !== 400) {
		throw new Error(`Expected status 400, got ${res.statusCode}`);
	}
});

// Test 6: Get roles endpoint
runTest('API: Should get all roles', () => {
	const req = createMockReq();
	const res = createMockRes();
	
	apiRoutes.getRoles(req, res);
	
	if (res.statusCode !== 200) {
		throw new Error(`Expected status 200, got ${res.statusCode}`);
	}
	if (!res.data.roles || res.data.roles.length === 0) {
		throw new Error('Expected roles array');
	}
});

// Test 7: Get corps endpoint
runTest('API: Should get all corps', () => {
	const req = createMockReq();
	const res = createMockRes();
	
	apiRoutes.getCorps(req, res);
	
	if (res.statusCode !== 200) {
		throw new Error(`Expected status 200, got ${res.statusCode}`);
	}
	if (!res.data.corps || res.data.corps.length === 0) {
		throw new Error('Expected corps array');
	}
});

// Test 8: Get categories grade endpoint
runTest('API: Should get all categories grade', () => {
	const req = createMockReq();
	const res = createMockRes();
	
	apiRoutes.getCategoriesGrade(req, res);
	
	if (res.statusCode !== 200) {
		throw new Error(`Expected status 200, got ${res.statusCode}`);
	}
	if (!res.data.categories_grade || res.data.categories_grade.length === 0) {
		throw new Error('Expected categories_grade array');
	}
});

// Test 9: Admin middleware - should allow admin
runTest('Middleware: Should allow admin access', () => {
	const req = createMockReq({}, { 'x-user-role': 'admin' });
	const res = createMockRes();
	let nextCalled = false;
	
	requireAdmin(req, res, () => {
		nextCalled = true;
	});
	
	if (!nextCalled) {
		throw new Error('Expected next() to be called for admin');
	}
});

// Test 10: Admin middleware - should block non-admin
runTest('Middleware: Should block non-admin access', () => {
	const req = createMockReq({}, { 'x-user-role': 'user' });
	const res = createMockRes();
	let nextCalled = false;
	
	requireAdmin(req, res, () => {
		nextCalled = true;
	});
	
	if (nextCalled) {
		throw new Error('Expected next() NOT to be called for non-admin');
	}
	if (res.statusCode !== 403) {
		throw new Error(`Expected status 403, got ${res.statusCode}`);
	}
});

// Test 11: Password not returned in response
runTest('API: Should not return password in response', () => {
	const req = createMockReq({
		matricule: 'API005',
		mot_de_passe: 'secretpassword',
		id_role: 1
	});
	const res = createMockRes();
	
	apiRoutes.createUser(req, res);
	
	if (res.data.user && res.data.user.mot_de_passe) {
		throw new Error('Password should not be in response');
	}
});

// Print test results
console.log('\n' + '='.repeat(50));
console.log('API Test Results:');
console.log(`Passed: ${passedTests}`);
console.log(`Failed: ${failedTests}`);
console.log(`Total: ${passedTests + failedTests}`);
console.log('='.repeat(50));

if (failedTests > 0) {
	process.exit(1);
} else {
	console.log('\n✓ All API tests passed!');
	process.exit(0);
}
