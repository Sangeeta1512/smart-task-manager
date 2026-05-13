import { useEffect, useState } from "react"
import { X } from "lucide-react"

import toast, { Toaster } from "react-hot-toast"

import API from "./services/api"

import TaskForm from "./components/TaskForm"
import TaskCard from "./components/TaskCard"

function App() {

  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState("")

  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")

  const [editingId, setEditingId] = useState(null)
  const [editingTitle, setEditingTitle] = useState("")

  useEffect(() => {

    fetchTasks()

  }, [])

  const fetchTasks = async () => {

    const response = await API.get("/tasks")

    setTasks(response.data)
  }

  const createTask = async () => {

    if (!title) return

    await API.post("/tasks", {
      title: title,
      completed: false
    })

    setTitle("")

    fetchTasks()
    toast.success(`"${title}" created`)
  }

  const deleteTask = async (id, title) => {

    await API.delete(`/tasks/${id}`)

    fetchTasks()
    toast.success(`"${title}" deleted`)
  }

  const toggleComplete = async (task) => {

    await API.put(`/tasks/${task.id}`, {
      title: task.title,
      completed: !task.completed
    })

    fetchTasks()
    toast.success(
      task.completed
        ? `"${task.title}" marked as pending`
        : `"${task.title}" completed`
    )
  }

  const startEditing = (task) => {

    setEditingId(task.id)

    setEditingTitle(task.title)
  }

  const saveTask = async (task) => {

    await API.put(`/tasks/${task.id}`, {
      title: editingTitle,
      completed: task.completed
    })

    setEditingId(null)

    fetchTasks()
    toast.success(`Updated to "${editingTitle}"`)
  }

  const filteredTasks = tasks.filter((task) => {

    const matchesSearch =
      task.title.toLowerCase().includes(
        search.toLowerCase()
      )

    const matchesFilter =
      filter === "all"
        ? true
        : filter === "completed"
        ? task.completed
        : !task.completed

    return matchesSearch && matchesFilter
  })

  const totalTasks = tasks.length

  const completedTasks =
    tasks.filter((task) => task.completed).length

  const pendingTasks =
    tasks.filter((task) => !task.completed).length

  const completionRate =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks / totalTasks) * 100
        )

  return (

    <div className="min-h-screen bg-gray-100 p-4 md:p-10">

      <Toaster position="top-right" />

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg">

        <h1 className="text-4xl font-bold text-blue-600 mb-6">
          Smart Task Manager
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

          <div className="bg-blue-100 p-4 rounded-xl text-center">
            <p className="text-sm text-gray-600">
              Total
            </p>
            <h2 className="text-2xl font-bold text-blue-600">
              {totalTasks}
            </h2>
          </div>

          <div className="bg-green-100 p-4 rounded-xl text-center">
            <p className="text-sm text-gray-600">
              Completed
            </p>
            <h2 className="text-2xl font-bold text-green-600">
              {completedTasks}
            </h2>
          </div>

          <div className="bg-yellow-100 p-4 rounded-xl text-center">
            <p className="text-sm text-gray-600">
              Pending
            </p>
            <h2 className="text-2xl font-bold text-yellow-600">
              {pendingTasks}
            </h2>
          </div>

          <div className="bg-purple-100 p-4 rounded-xl text-center">
            <p className="text-sm text-gray-600">
              Progress
            </p>
            <h2 className="text-2xl font-bold text-purple-600">
              {completionRate}%
            </h2>
          </div>

        </div>

        <TaskForm
          title={title}
          setTitle={setTitle}
          createTask={createTask}
        />

        <div className="flex flex-col md:flex-row gap-4 mb-6">

          <div className="relative flex-1">

            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-3 border rounded-xl"
            />

            {
              search && (

                <button
                  onClick={() => {
                    setSearch("")
                    setFilter("all")
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                >
                  <X size={18} />
                </button>

              )
            }

          </div>

          <div className="flex gap-2 justify-between">

            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-xl ${
                filter === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              All
            </button>

            <button
              onClick={() => setFilter("pending")}
              className={`px-4 py-2 rounded-xl ${
                filter === "pending"
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              Pending
            </button>

            <button
              onClick={() => setFilter("completed")}
              className={`px-4 py-2 rounded-xl ${
                filter === "completed"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              Completed
            </button>

          </div>

        </div>

        <div className="space-y-4">

          {
            filteredTasks.map((task) => (

              <TaskCard
                key={task.id}
                task={task}
                editingId={editingId}
                editingTitle={editingTitle}
                setEditingTitle={setEditingTitle}
                startEditing={startEditing}
                saveTask={saveTask}
                toggleComplete={toggleComplete}
                deleteTask={deleteTask}
              />

            ))
          }

        </div>

      </div>

    </div>

  )
}

export default App