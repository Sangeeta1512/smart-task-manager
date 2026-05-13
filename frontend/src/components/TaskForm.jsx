function TaskForm({
  title,
  setTitle,
  createTask
}) {

  return (

    <div className="flex gap-4 mb-6">

      <input
        type="text"
        placeholder="Enter task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 p-3 border rounded-xl"
      />

      <button
        onClick={createTask}
        className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700"
      >
        +
      </button>

    </div>

  )
}

export default TaskForm