// src/components/TodoItem.jsx
import React, { useState } from 'react';
import { Draggable } from '@hello-pangea/dnd';

const TodoItem = ({ todo, index, onToggle, onDelete, onUpdate, onChangePriority }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);

    const handleEdit = () => {
        setIsEditing(true);
        setEditText(todo.text);
    };

    const handleSave = () => {
        if (editText.trim()) {
            onUpdate(todo.id, editText.trim());
        }
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditText(todo.text);
        setIsEditing(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSave();
        } else if (e.key === 'Escape') {
            handleCancel();
        }
    };

    const getPriorityIcon = (priority) => {
        switch (priority) {
            case 'high': return '🔴';
            case 'medium': return '🟡';
            case 'low': return '🟢';
            default: return '⚪';
        }
    };

    const getPriorityClass = (priority) => {
        return `priority-${priority}`;
    };

    return (
        <Draggable draggableId={todo.id} index={index}>
            {(provided, snapshot) => (
                <div
                    className={`todo-item ${todo.completed ? 'completed' : ''} ${
                        snapshot.isDragging ? 'dragging' : ''
                    } ${getPriorityClass(todo.priority)}`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                >
                    <div className="todo-content">
                        <div
                            className="drag-handle"
                            {...provided.dragHandleProps}
                        >
                            ⋮⋮
                        </div>

                        <div className="todo-checkbox">
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => onToggle(todo.id)}
                                className="checkbox"
                            />
                        </div>

                        <div className="todo-text-container">
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    onBlur={handleSave}
                                    className="edit-input"
                                    autoFocus
                                />
                            ) : (
                                <span
                                    className="todo-text"
                                    onDoubleClick={handleEdit}
                                >
                  {todo.text}
                </span>
                            )}
                        </div>

                        <div className="todo-priority">
                            <select
                                value={todo.priority}
                                onChange={(e) => onChangePriority(todo.id, e.target.value)}
                                className="priority-select"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <option value="low">🟢 Низкий</option>
                                <option value="medium">🟡 Средний</option>
                                <option value="high">🔴 Высокий</option>
                            </select>
                        </div>

                        <div className="todo-actions">
                            <button
                                className="edit-btn"
                                onClick={handleEdit}
                                title="Редактировать"
                            >
                                ✏️
                            </button>
                            <button
                                className="delete-btn"
                                onClick={() => onDelete(todo.id)}
                                title="Удалить"
                            >
                                🗑️
                            </button>
                        </div>
                    </div>

                    <div className="priority-indicator">
                        {getPriorityIcon(todo.priority)}
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default TodoItem;