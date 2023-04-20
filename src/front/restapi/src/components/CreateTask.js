import React, { useState } from 'react';
import { createTask } from '../Api';

function AddTaskForm({ onAddTask }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const newTask = { name, description, complete: false };
        const createdTask = await createTask(newTask);
        onAddTask(createdTask); // вызов переданной функции для обновления списка задач
        setName('');
        setDescription('');
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <label>
                Название задачи:
                <input required="required" type="text" value={name} onChange={e => setName(e.target.value)} />
            </label>
            <label>
                Описание задачи:
                <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
            </label>
            <button type="submit">Создать задачу</button>
        </form>
    );
}

export default AddTaskForm;