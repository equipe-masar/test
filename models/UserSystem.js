class UserSystem {
	constructor() {
		this.users = new Map();
		this._nextId = 1;
	}

	_now() {
		return new Date();
	}

	_defaultUserData() {
		return {
			id: null,
			militaryId: '',
			nationalId: '',
			fullName: '',
			rank: '',
			unitId: '',
			unit: null,
			userType: '',
			status: '',
			username: '',
			passwordHash: '',
			lastPasswordChange: null,
			failedLoginAttempts: 0,
			lastLogin: null,
			lastActivity: null,
			createdAt: this._now(),
			updatedAt: this._now(),
		};
	}

	createUser(data = {}) {
		const id = String(this._nextId++);
		const defaults = this._defaultUserData();
		const user = Object.assign({}, defaults, data, { id, createdAt: this._now(), updatedAt: this._now() });
		this.users.set(id, user);
		return user;
	}

	getUserById(id) {
		return this.users.get(String(id)) || null;
	}

	listUsers() {
		return Array.from(this.users.values());
	}

	updateUser(id, patch = {}) {
		const key = String(id);
		const existing = this.users.get(key);
		if (!existing) return null;
		const updated = Object.assign({}, existing, patch, { id: key, updatedAt: this._now() });
		this.users.set(key, updated);
		return updated;
	}

	incrementFailedLogin(id) {
		const key = String(id);
		const user = this.users.get(key);
		if (!user) return null;
		user.failedLoginAttempts = (user.failedLoginAttempts || 0) + 1;
		user.updatedAt = this._now();
		this.users.set(key, user);
		return user.failedLoginAttempts;
	}

	resetFailedLogin(id) {
		const key = String(id);
		const user = this.users.get(key);
		if (!user) return null;
		user.failedLoginAttempts = 0;
		user.updatedAt = this._now();
		this.users.set(key, user);
		return user;
	}

	setLastLogin(id, when = null) {
		const key = String(id);
		const user = this.users.get(key);
		if (!user) return null;
		user.lastLogin = when || this._now();
		user.updatedAt = this._now();
		this.users.set(key, user);
		return user;
	}

	setLastActivity(id, when = null) {
		const key = String(id);
		const user = this.users.get(key);
		if (!user) return null;
		user.lastActivity = when || this._now();
		user.updatedAt = this._now();
		this.users.set(key, user);
		return user;
	}

	setPasswordHash(id, hash) {
		const key = String(id);
		const user = this.users.get(key);
		if (!user) return null;
		user.passwordHash = hash;
		user.lastPasswordChange = this._now();
		user.updatedAt = this._now();
		this.users.set(key, user);
		return user;
	}

	deleteUser(id) {
		return this.users.delete(String(id));
	}
}

module.exports = UserSystem;

