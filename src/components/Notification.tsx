import React from 'react';

type Props = {
  message: string;
  onClose: () => void;
};

export const Notification: React.FC<Props> = ({ message, onClose }) => (
  <div
    data-cy="ErrorNotification"
    className={`notification is-danger${!message ? ' hidden' : ''}`}
    role="alert"
  >
    {message}
    <button
      data-cy="HideErrorButton"
      className="delete"
      aria-label="Hide error"
      onClick={onClose}
    />
  </div>
);
