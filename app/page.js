'use client'
import { useEffect, useState } from 'react'

export default function Home() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  const [editId, setEditId] = useState(null)

  useEffect(() => {
    fetchTodos()
  }, [])

  async function fetchTodos() {
    const res = await fetch('/api/todos')
    const data = await res.json()
    setTodos(data)
  }

  async function handleSubmit() {
    if (editId) {
      await fetch('/api/todos', {
        method: 'PUT',
        body: JSON.stringify({ id: editId, text: input }),
      })
    } else {
      await fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify({ text: input }),
      })
    }
    setInput('')
    setEditId(null)
    fetchTodos()
  }

  async function handleDelete(id) {
    await fetch('/api/todos', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    })
    fetchTodos()
  }

  function handleEdit(todo) {
    setInput(todo.text)
    setEditId(todo._id)
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow rounded space-y-4">
      <h1 className="text-xl font-bold">Todo List</h1>
      <div className="flex gap-2">
        <input
          className="flex-1 border p-2 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter todo..."
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editId ? 'Update' : 'Add'}
        </button>
      </div>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className="flex justify-between items-center border p-2 rounded"
          >
            <span>{todo.text}</span>
            <div className="space-x-2">
              <button onClick={() => handleEdit(todo)} className="text-yellow-500">
                Edit
              </button>
              <button onClick={() => handleDelete(todo._id)} className="text-red-500">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
