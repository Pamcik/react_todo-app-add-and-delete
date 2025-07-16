import React from 'react';

type Props = {
  errorMessage: string;
  onClose: () => void;
};

export const ErrorNotification: React.FC<Props> = ({
  errorMessage,
  onClose,
}) => {
  return (
    <div
      data-cy="ErrorNotification"
      className={`notification is-danger is-light has-text-weight-normal ${
        !errorMessage ? 'hidden' : ''
      }`}
    >
      <button
        type="button"
        className="delete"
        aria-label="Close"
        onClick={onClose}
        data-cy="HideErrorButton"
      />
      {errorMessage}
    </div>
  );
};
