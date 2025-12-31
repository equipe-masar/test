import { useAuth } from '../auth/AuthContext.jsx'

export default function AdminPage() {
  const { user, role, logout } = useAuth()

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          borderBottom: '1px solid #ddd',
        }}
      >
        <div style={{ fontWeight: 700 }}>GRH</div>
        <button onClick={logout}>Logout</button>
      </div>

      <div style={{ padding: 24 }}>
        <h2>Dashboard Administrateur</h2>
        <div>Utilisateur: {user?.username}</div>
        <div>Rôle: {role}</div>
      </div>
    </div>
  )
}
