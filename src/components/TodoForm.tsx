import React from 'react';

type Props = {
  title: string;
  onChange: (v: string) => void;
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
}) => (
  <form className="todoapp__new-todo-wrapper" onSubmit={onSubmit}>
    <input
      ref={inputRef}
      type="text"
      className="todoapp__new-todo"
      placeholder="What needs to be done?"
      value={title}
      onChange={e => onChange(e.target.value)}
      disabled={disabled}
      data-cy="NewTodoField"
    />
  </form>
);
