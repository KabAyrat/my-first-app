import React, { useState, useEffect } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import TodoList from './components/Todolist';
import { initialTodos } from './data/initialTodos';
import { FILTERS, EMPTY_MESSAGES, STORAGE_KEY } from './utils/constants';
import './App.css';

function App() {
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem(STORAGE_KEY);
        return savedTodos ? JSON.parse(savedTodos) : initialTodos;
    });
    const [newTodo, setNewTodo] = useState('');
    const [filter, setFilter] = useState(FILTERS.ALL);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }, [todos]);

    const addTodo = () => {
        if (newTodo.trim()) {
            const todo = {
                id: Date.now().toString(),
                text: newTodo.trim(),
                completed: false,
                priority: 'medium'
            };
            setTodos([...todos, todo]);
            setNewTodo('');
        }
    };

    const toggleTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const updateTodo = (id, newText) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, text: newText } : todo
        ));
    };

    const changePriority = (id, priority) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, priority } : todo
        ));
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const items = Array.from(todos);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setTodos(items);
    };

    const getFilteredTodos = () => {
        switch (filter) {
            case FILTERS.ACTIVE:
                return todos.filter(todo => !todo.completed);
            case FILTERS.COMPLETED:
                return todos.filter(todo => todo.completed);
            default:
                return todos;
        }
    };

    const clearCompleted = () => {
        setTodos(todos.filter(todo => !todo.completed));
    };

    const filteredTodos = getFilteredTodos();
    const activeTodosCount = todos.filter(todo => !todo.completed).length;

    return (
        <div className="app">
            <div className="container">
                <header className="header">
                    <h1 className="title">📝Список дел</h1>
                    <div className="add-todo">
                        <input
                            type="text"
                            className="todo-input"
                            placeholder="Добавить новое дело..."
                            value={newTodo}
                            onChange={(e) => setNewTodo(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                        />
                        <button className="add-btn" onClick={addTodo}>
                            ➕ Добавить
                        </button>
                    </div>
                </header>

                <div className="filters">
                    <button
                        className={`filter-btn ${filter === FILTERS.ALL ? 'active' : ''}`}
                        onClick={() => setFilter(FILTERS.ALL)}
                    >
                        Все ({todos.length})
                    </button>
                    <button
                        className={`filter-btn ${filter === FILTERS.ACTIVE ? 'active' : ''}`}
                        onClick={() => setFilter(FILTERS.ACTIVE)}
                    >
                        Активные ({activeTodosCount})
                    </button>
                    <button
                        className={`filter-btn ${filter === FILTERS.COMPLETED ? 'active' : ''}`}
                        onClick={() => setFilter(FILTERS.COMPLETED)}
                    >
                        Завершенные ({todos.length - activeTodosCount})
                    </button>
                </div>

                <DragDropContext onDragEnd={handleDragEnd}>
                    <TodoList
                        todos={filteredTodos}
                        onToggle={toggleTodo}
                        onDelete={deleteTodo}
                        onUpdate={updateTodo}
                        onChangePriority={changePriority}
                    />
                </DragDropContext>

                {todos.some(todo => todo.completed) && (
                    <div className="footer">
                        <button className="clear-btn" onClick={clearCompleted}>
                            🗑️ Очистить завершенные
                        </button>
                    </div>
                )}

                {filteredTodos.length === 0 && (
                    <div className="empty-state">
                        <p>{EMPTY_MESSAGES[filter]}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;