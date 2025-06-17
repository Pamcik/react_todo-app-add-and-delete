import React from 'react';

type Props = {
  title: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  disabled: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
};

export const TodoForm: React.FC<Props> = ({
  title,
  onChange,
  onSubmit,
  disabled,
  inputRef,
}) => {
  return (
    <form onSubmit={onSubmit} data-cy="TodoForm">
      <input
        data-cy="NewTodoField"
        type="text"
        className="input todoapp__new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={e => onChange(e.target.value)}
        disabled={disabled}
        ref={inputRef}
        autoFocus
      />
    </form>
  );
};
