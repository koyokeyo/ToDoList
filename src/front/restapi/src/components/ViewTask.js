import React, { useState, useEffect, useMemo } from 'react';
import {getTasks, updateTask, getTask, createTask, deleteTask} from '../Api';
import AddTaskForm from "./CreateTask";

function handleTaskCheckBoxChangeFun(setTasks) {
    const handleTaskCheckboxChange = async (taskId, complete) => {
        let oldTask = await getTask(taskId);
        oldTask.complete = complete;
        console.log(oldTask);
        const updatedTask = await updateTask(taskId, oldTask);
        console.log("Новая таска: " + updatedTask);
        setTasks(tasks => tasks.map(task => task.id === taskId ? updatedTask : task));
    };
    return handleTaskCheckboxChange;
}

function TaskList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const tasks = await getTasks();
            setTasks(tasks);
        };
        fetchTasks();
    }, []);

    const sortedTasks = useMemo(() => {
        return [...tasks].sort((a, b) => a.id - b.id);
    }, [tasks]);

    const handleTaskCheckboxChange = handleTaskCheckBoxChangeFun(setTasks);
    const handleAddTask = async (newTask) => {
        const createdTask = await createTask(newTask);
        setTasks(tasks => [...tasks, createdTask]);
    };
    const handleDeleteTask = async (taskId) => {
        await deleteTask(taskId); // отправка запроса на удаление задачи на сервере
        setTasks(tasks => tasks.filter(task => task.id !== taskId)); // удаление задачи из списка задач и вызов перерисовки
    };
    return (
        <div>
            <div id="add-task-wrapper">
            <AddTaskForm onAddTask={handleAddTask} />
            </div>
        <div>
            <ul>
                {sortedTasks.map((task) => (
                    <li key={task.id}>
                        <div className="task-card">
                                <div className="details-block">
                                <span>Название: </span>
                                <p className="task-name" style={{ textDecoration: task.complete ? 'line-through' : 'none' }}>{task.name}</p>
                                </div>
                                <div className="details-block">
                                <span>Описание: </span>
                                <p className="task-desc" style={{ textDecoration: task.complete ? 'line-through' : 'none' }}>{task.description}</p>
                                </div>
                                <div className="button-block">
                                <input
                                    className="checkbox-done"
                                    type="checkbox"
                                    checked={task.complete}
                                    onChange={(e) => handleTaskCheckboxChange(task.id, e.target.checked)}
                                />
                                <a className="delete" onClick={() => handleDeleteTask(task.id)}>
                                    Удалить
                                </a>
                                </div>


                        </div>
                    </li>
                ))}
            </ul>
        </div>
        </div>
    );
}

export default TaskList;