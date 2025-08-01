// src/components/TodoList.jsx
import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onToggle, onDelete, onUpdate, onChangePriority }) => {
    return (
        <Droppable droppableId="todos">
            {(provided, snapshot) => (
                <div
                    className={`todo-list ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                >
                    {todos.map((todo, index) => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            index={index}
                            onToggle={onToggle}
                            onDelete={onDelete}
                            onUpdate={onUpdate}
                            onChangePriority={onChangePriority}
                        />
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default TodoList;