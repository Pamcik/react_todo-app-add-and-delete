import React, { FormEvent, RefObject } from 'react';

type Props = {
  title: string;
  onTitleChange: (value: string) => void;
  onAdd: (event: FormEvent) => void;
  inputRef: RefObject<HTMLInputElement>;
  isLoading: boolean;
};

export const TodoHeader: React.FC<Props> = ({
  title,
  onTitleChange,
  onAdd,
  inputRef,
  isLoading,
}) => {
  return (
    <header className="todoapp__header">
      <form onSubmit={onAdd}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          disabled={isLoading}
          ref={inputRef}
        />
      </form>
    </header>
  );
};
