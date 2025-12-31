import { useAuth } from '../auth/AuthContext.jsx'

export default function ValidateurPage() {
  const { user, role, logout } = useAuth()

  return (
    <div style={{ padding: 24 }}>
      <h2>Page Validateur</h2>
      <div>Utilisateur: {user?.username}</div>
      <div>Rôle: {role}</div>
      <button onClick={logout} style={{ marginTop: 12 }}>
        Logout
      </button>
    </div>
  )
}
