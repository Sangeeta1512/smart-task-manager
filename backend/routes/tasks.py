from fastapi import APIRouter
from models import Task
from schemas import TaskCreate
from database import SessionLocal

router = APIRouter()


@router.get("/tasks")
def get_tasks():

    db = SessionLocal()

    tasks = db.query(Task).all()

    return tasks


@router.post("/tasks")
def create_task(task: TaskCreate):

    db = SessionLocal()

    new_task = Task(
        title=task.title,
        completed=task.completed
    )

    db.add(new_task)

    db.commit()

    return {
        "message": "Task created",
        "task": {
            "id": new_task.id,
            "title": new_task.title,
            "completed": new_task.completed
        }
    }


@router.get("/tasks/{task_id}")
def get_task(task_id: int):

    db = SessionLocal()

    task = db.query(Task).filter(Task.id == task_id).first()

    if task:
        return task

    return {"error": "Task not found"}


@router.put("/tasks/{task_id}")
def update_task(task_id: int, updated_task: TaskCreate):

    db = SessionLocal()

    task = db.query(Task).filter(Task.id == task_id).first()

    if task:

        task.title = updated_task.title
        task.completed = updated_task.completed

        db.commit()

        return {
            "message": "Task updated",
            "task": task
        }

    return {"error": "Task not found"}


@router.delete("/tasks/{task_id}")
def delete_task(task_id: int):

    db = SessionLocal()

    task = db.query(Task).filter(Task.id == task_id).first()

    if task:

        db.delete(task)

        db.commit()

        return {
            "message": "Task deleted",
            "task": task
        }

    return {"error": "Task not found"}