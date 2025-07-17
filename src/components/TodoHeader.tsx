import React, { useState, useRef, useEffect, FormEvent } from 'react';
import '../styles/index.scss';

interface Props {
  isLoading: boolean;
  onAdd: (title: string) => Promise<void>;
}

const TodoHeader: React.FC<Props> = ({ isLoading, onAdd }) => {
  const [newTitle, setNewTitle] = useState<string>('');
  const inputEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isLoading) {
      inputEl.current?.focus();
    }
  }, [isLoading]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await onAdd(newTitle);
      setNewTitle('');
    } catch {}
  };

  return (
    <header className="todoapp__header" data-cy="Header">
      <h1 className="todoapp__title">todos</h1>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputEl}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          disabled={isLoading}
          autoFocus
          data-cy="NewTodoField"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="todoapp__add-button"
          data-cy="AddTodoButton"
        ></button>
      </form>
    </header>
  );
};

export default React.memo(TodoHeader);
