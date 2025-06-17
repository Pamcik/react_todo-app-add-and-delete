import React, { useEffect, useRef, useState } from 'react';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { Notification } from './components/Notification';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';

const USER_ID = 3135;
const API_URL = 'https://mate.academy/students-api/todos';

type Filter = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [title, setTitle] = useState('');
  const [loadingIds, setLoadingIds] = useState<number[]>([]);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  const showError = (msg: string) => {
    setError(msg);
    setTimeout(() => setError(''), 3000);
  };

  useEffect(() => {
    fetch(`${API_URL}?userId=${USER_ID}`)
      .then(res => {
        if (!res.ok) {
          throw new Error();
        }

        return res.json();
      })
      .then(setTodos)
      .catch(() => showError('Unable to load todos'));
  }, []);

  useEffect(() => {
    if (tempTodo === null) {
      inputRef.current?.focus();
    }
  }, [tempTodo]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();

    if (!trimmed) {
      showError('Title should not be empty');

      return;
    }

    const newTodo: Todo = {
      id: 0,
      title: trimmed,
      completed: false,
      userId: USER_ID,
    };

    setTempTodo(newTodo);

    let created!: Todo;
    let isSuccess = false;

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodo),
      });

      if (!res.ok) {
        throw new Error();
      }

      created = await res.json();
      isSuccess = true;
    } catch {
      showError('Unable to add a todo');
    } finally {
      setTimeout(() => {
        if (isSuccess) {
          setTodos(prev => [...prev, created]);
          setTitle('');
        }

        setTempTodo(null);
      }, 0);
    }
  };

  const handleDelete = (id: number) => {
    setLoadingIds(prev => [...prev, id]);

    setTimeout(async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });

        if (!res.ok) {
          throw new Error();
        }

        setTodos(prev => prev.filter(t => t.id !== id));
      } catch {
        showError('Unable to delete a todo');
      } finally {
        setLoadingIds(prev => prev.filter(i => i !== id));
        inputRef.current?.focus();
      }
    }, 0);
  };

  const handleToggle = async (id: number, completed: boolean) => {
    setLoadingIds(prev => [...prev, id]);
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed }),
      });

      if (!res.ok) {
        throw new Error();
      }

      setTodos(prev => prev.map(t => (t.id === id ? { ...t, completed } : t)));
    } catch {
      showError('Unable to update a todo');
    } finally {
      setLoadingIds(prev => prev.filter(i => i !== id));
    }
  };

  const handleRename = async (id: number, newTitle: string) => {
    setLoadingIds(prev => [...prev, id]);
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle }),
      });

      if (!res.ok) {
        throw new Error();
      }

      setTodos(prev =>
        prev.map(t => (t.id === id ? { ...t, title: newTitle } : t)),
      );
    } catch {
      showError('Unable to rename a todo');
    } finally {
      setLoadingIds(prev => prev.filter(i => i !== id));
    }
  };

  const handleClearCompleted = () => {
    todos.filter(t => t.completed).forEach(t => handleDelete(t.id));
  };

  const visibleTodos = todos.filter(t => {
    if (filter === 'active') {
      return !t.completed;
    }

    if (filter === 'completed') {
      return t.completed;
    }

    return true;
  });

  const remainingCount = todos.filter(t => !t.completed).length;
  const hasAny = todos.length > 0;
  const hasCompleted = todos.some(t => t.completed);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <section className="todoapp section container">
      <h1 className="title todoapp__title">Todo App</h1>

      <TodoForm
        title={title}
        onChange={setTitle}
        onSubmit={handleAdd}
        disabled={!!tempTodo}
        inputRef={inputRef}
      />

      <Notification message={error} onClose={() => setError('')} />

      <TodoList
        todos={visibleTodos}
        loadingIds={loadingIds}
        onDelete={handleDelete}
        onToggle={handleToggle}
        onRename={handleRename}
        tempTodo={tempTodo}
      />

      {hasAny && (
        <footer className="footer" data-cy="Filter">
          <span data-cy="TodosCounter">
            {remainingCount} {remainingCount === 1 ? 'item left' : 'items left'}
          </span>
          <ul className="filters">
            <li>
              <button
                data-cy="FilterLinkAll"
                className={filter === 'all' ? 'selected' : ''}
                onClick={() => setFilter('all')}
              >
                All
              </button>
            </li>
            <li>
              <button
                data-cy="FilterLinkActive"
                className={filter === 'active' ? 'selected' : ''}
                onClick={() => setFilter('active')}
              >
                Active
              </button>
            </li>
            <li>
              <button
                data-cy="FilterLinkCompleted"
                className={filter === 'completed' ? 'selected' : ''}
                onClick={() => setFilter('completed')}
              >
                Completed
              </button>
            </li>
          </ul>
        </footer>
      )}

      {hasAny && (
        <button
          data-cy="ClearCompletedButton"
          className="button is-danger mt-3"
          onClick={handleClearCompleted}
          disabled={!hasCompleted}
        >
          Clear completed
        </button>
      )}
    </section>
  );
};
