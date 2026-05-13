import {
  Check,
  RotateCcw,
  Pencil,
  Trash2,
  Save
} from "lucide-react"

function TaskCard({
  task,
  editingId,
  editingTitle,
  setEditingTitle,
  startEditing,
  saveTask,
  toggleComplete,
  deleteTask
}) {

  return (

    <div
      className="p-4 border rounded-xl flex flex-col md:flex-row md:justify-between md:items-center gap-4"
    >

      <div className="flex-1">

        {
          editingId === task.id ? (

            <input
              type="text"
              value={editingTitle}
              onChange={(e) =>
                setEditingTitle(e.target.value)
              }
              className="w-full p-2 border rounded-lg"
            />

          ) : (

            <>
              <h2 className="text-xl font-semibold">
                {task.title}
              </h2>

              <p className="text-gray-500">
                Status:
                {
                  task.completed
                    ? " Completed"
                    : " Pending"
                }
              </p>
            </>

          )
        }

      </div>

      <div className="flex gap-2 md:ml-4">

        <button
            onClick={() => toggleComplete(task)}
            disabled={editingId === task.id}
            title={
                task.completed
                ? "Mark as Pending"
                : "Mark as Complete"
            }
            className="
                p-2
                rounded-lg
                bg-green-100
                hover:bg-green-200
                transition
                disabled:opacity-40
                disabled:cursor-not-allowed
            "
            >

            {
                task.completed
                ? <RotateCcw size={18} />
                : <Check size={18} />
            }

        </button>

        {
          editingId === task.id ? (

            <button
                onClick={() => saveTask(task)}
                title="Save Task"
                className="
                    p-2
                    rounded-lg
                    bg-green-100
                    hover:bg-green-200
                    transition
                "
                >
                <Save size={18} />
            </button>

          ) : (

            <button
                onClick={() => startEditing(task)}
                title="Edit Task"
                className="
                    p-2
                    rounded-lg
                    bg-blue-100
                    hover:bg-blue-200
                    transition
                "
                >
                <Pencil size={18} />
            </button>

          )
        }

        <button
            onClick={() => deleteTask(task.id, task.title)}
            disabled={editingId === task.id}
            title="Delete Task"
            className="
                p-2
                rounded-lg
                bg-red-100
                hover:bg-red-200
                transition
                disabled:opacity-40
                disabled:cursor-not-allowed
            "
            >
            <Trash2 size={18} />
        </button>

      </div>

    </div>

  )
}

export default TaskCard