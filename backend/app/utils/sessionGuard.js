const jwt = require('jsonwebtoken')

// In-memory session + attempt guards. This is instance-local (not shared across servers).
const activeSessions = new Map() // username -> { jti, expiresAt }
const attempts = new Map() // username -> { count, lockUntil }

const MAX_ATTEMPTS = 5
const LOCK_MS = 5 * 60 * 1000

function cleanupSessions() {
  const now = Date.now()
  for (const [u, { expiresAt }] of activeSessions.entries()) {
    if (expiresAt && expiresAt <= now) {
      activeSessions.delete(u)
    }
  }
}

function cleanupAttempts() {
  const now = Date.now()
  for (const [u, info] of attempts.entries()) {
    if (info.lockUntil && info.lockUntil <= now) {
      attempts.delete(u)
    }
  }
}

function getLockInfo(username) {
  cleanupAttempts()
  const entry = attempts.get(username)
  if (!entry) return { locked: false, remainingMs: 0 }
  const remainingMs = entry.lockUntil ? Math.max(0, entry.lockUntil - Date.now()) : 0
  return { locked: Boolean(entry.lockUntil && remainingMs > 0), remainingMs }
}

function registerFailure(username) {
  cleanupAttempts()
  const entry = attempts.get(username) || { count: 0, lockUntil: null }
  entry.count += 1
  if (entry.count >= MAX_ATTEMPTS) {
    entry.lockUntil = Date.now() + LOCK_MS
    entry.count = MAX_ATTEMPTS
  }
  attempts.set(username, entry)
  const locked = Boolean(entry.lockUntil && entry.lockUntil > Date.now())
  const remaining = locked ? 0 : Math.max(0, MAX_ATTEMPTS - entry.count)
  const remainingMs = entry.lockUntil ? Math.max(0, entry.lockUntil - Date.now()) : 0
  return { locked, attemptsLeft: remaining, remainingMs }
}

function resetAttempts(username) {
  attempts.delete(username)
}

function hasActiveSession(username) {
  cleanupSessions()
  const entry = activeSessions.get(username)
  if (!entry) return false
  const expired = entry.expiresAt && entry.expiresAt <= Date.now()
  if (expired) {
    activeSessions.delete(username)
    return false
  }
  return true
}

function setSession(username, jti, ttlMs) {
  const expiresAt = Date.now() + ttlMs
  activeSessions.set(username, { jti, expiresAt })
}

function validateSession(username, jti) {
  cleanupSessions()
  const entry = activeSessions.get(username)
  if (!entry) return false
  const expired = entry.expiresAt && entry.expiresAt <= Date.now()
  if (expired) {
    activeSessions.delete(username)
    return false
  }
  return entry.jti === jti
}

function clearSession(username) {
  activeSessions.delete(username)
}

function clearSessionFromToken(token, secret) {
  try {
    const decoded = jwt.verify(token, secret)
    if (decoded?.username) {
      clearSession(decoded.username)
    }
  } catch (_) {
    // ignore invalid token on logout cleanup
  }
}

module.exports = {
  MAX_ATTEMPTS,
  LOCK_MS,
  getLockInfo,
  registerFailure,
  resetAttempts,
  hasActiveSession,
  setSession,
  validateSession,
  clearSession,
  clearSessionFromToken,
}
