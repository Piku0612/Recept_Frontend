import { useState, useEffect } from 'react'
import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { getAllUsers, userEdit, deleteUser } from '../api'
import AppNavbar from '../components/AppNavbar'
import Table from '../components/Table'

export default function Admin() {
  const { user, loading, onLogout } = useAuth()

  const [allUsers, setAllUsers] = useState([])
  const [errorAllUsers, setErrorAllUsers] = useState('')

  const [selectedUser, setSelectedUser] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')

  useEffect(() => {
    async function loadUsers() {
      const data = await getAllUsers()

      if (!data.error) {
        setAllUsers(data)
        return
      }

      setErrorAllUsers(data.error)
    }

    loadUsers()
  }, [])

  if (loading) {
    return (
      <div className="container py-5">
        <div className="spinner-border text-danger"></div>
      </div>
    )
  }

  const normalizedRole = String(user?.role ?? "").toLowerCase()
  const isAdmin = normalizedRole === "admin" || normalizedRole === "1"

  if (!user || !isAdmin) {
    return <Navigate to='/' />
  }

  function handleEdit(user) {
    setSelectedUser(user)
    setUsername(user.username || '')
    setEmail(user.email || '')
    setRole(user.role || '')
    setShowModal(true)
  }

  async function handleDelete(user) {
    setErrorAllUsers('')

    const confirmDelete = window.confirm(`Biztosan törölni akarod a ${user.username} felhasználót?`)
    if (!confirmDelete) return

    const data = await deleteUser(user.user_id)

    if (data.error) {
      setErrorAllUsers(data.error)
      alert(data.error)
      return
    }

    setAllUsers((prev) => prev.filter((u) => u.user_id !== user.user_id))
    alert('Sikeres törlés')
  }

  async function editUser(user_id) {
    setErrorAllUsers('')

    const data = await userEdit(user_id, username, email, role)

    if (data.error) {
      setErrorAllUsers(data.error)
      alert(data.error)
      return
    }

    setAllUsers((prev) =>
      prev.map((u) =>
        u.user_id === user_id ? { ...u, username, email, role } : u
      )
    )

    setShowModal(false)
    alert('Sikeres módosítás')
  }

  return (
    <div>
      <AppNavbar user={user} onLogout={onLogout} />

      <div className="container py-5">
        <h1>Admin panel</h1>

        {errorAllUsers && (
          <div className="alert alert-danger">{errorAllUsers}</div>
        )}

        <Table allUsers={allUsers} onEdit={handleEdit} onDelete={handleDelete} />

        {showModal && selectedUser && (
          <div className='modal d-block' tabIndex='-1'>
            <div className="modal-dialog">
              <div className="modal-content p-3">
                <h5>Szerkesztés</h5>

                <label className="form-label fw-bold">Username: </label>
                <input
                  type="text"
                  className='form-control'
                  value={username}
                  placeholder='John Doe'
                  onChange={(e) => setUsername(e.target.value)}
                />

                <label className="form-label fw-bold mt-2">Email: </label>
                <input
                  type="email"
                  className='form-control'
                  value={email}
                  placeholder='example@example.com'
                  onChange={(e) => setEmail(e.target.value)}
                />

                <label className="form-label fw-bold mt-2">Role: </label>
                <input
                  type="text"
                  className='form-control'
                  value={role}
                  placeholder='admin/user'
                  onChange={(e) => setRole(e.target.value)}
                />

                <div className="d-flex justify-content-between mt-3">
                  <button
                    type='button'
                    className='btn btn-secondary'
                    onClick={() => setShowModal(false)}
                  >
                    Bezárás
                  </button>

                  <button
                    type='button'
                    className='btn btn-primary'
                    onClick={() => editUser(selectedUser.user_id)}
                  >
                    Módosít
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}