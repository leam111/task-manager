import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const headers = { Authorization: `Bearer ${token}` }

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    const res = await axios.get('http://localhost:5000/api/tasks', { headers })
    setTasks(res.data)
  }

  const addTask = async () => {
    if (!title) return
    await axios.post('http://localhost:5000/api/tasks', { title, description }, { headers })
    setTitle('')
    setDescription('')
    fetchTasks()
  }

  const toggleDone = async (task) => {
    await axios.patch(`http://localhost:5000/api/tasks/${task.id}`, { done: !task.done }, { headers })
    fetchTasks()
  }

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`, { headers })
    fetchTasks()
  }

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ color: '#4f46e5' }}>My Tasks</h2>
        <button onClick={logout} style={{ width: 'auto', padding: '8px 16px', background: '#ef4444' }}>Logout</button>
      </div>

      <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Add New Task</h3>
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <input placeholder="Description (optional)" value={description} onChange={e => setDescription(e.target.value)} />
        <button onClick={addTask}>Add Task</button>
      </div>

      {tasks.map(task => (
        <div key={task.id} style={{ background: 'white', padding: '1rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontWeight: 'bold', textDecoration: task.done ? 'line-through' : 'none', color: task.done ? '#9ca3af' : '#111' }}>{task.title}</p>
            {task.description && <p style={{ fontSize: '13px', color: '#6b7280' }}>{task.description}</p>}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => toggleDone(task)} style={{ width: 'auto', padding: '6px 12px', background: task.done ? '#9ca3af' : '#10b981' }}>
              {task.done ? 'Undo' : 'Done'}
            </button>
            <button onClick={() => deleteTask(task.id)} style={{ width: 'auto', padding: '6px 12px', background: '#ef4444' }}>
              Delete
            </button>
          </div>
        </div>
      ))}

      {tasks.length === 0 && (
        <p style={{ textAlign: 'center', color: '#9ca3af' }}>No tasks yet. Add one above!</p>
      )}
    </div>
  )
}

export default Dashboard