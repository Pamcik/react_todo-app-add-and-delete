export enum ErrorType {
  EMPTY_TITLE = 'EMPTY_TITLE',
  LOAD_TODOS = 'LOAD_TODOS',
  ADD_TODO = 'ADD_TODO',
  DELETE_TODO = 'DELETE_TODO',
}

export const ErrorMessage: Record<ErrorType, string> = {
  [ErrorType.EMPTY_TITLE]: 'Title should not be empty',
  [ErrorType.LOAD_TODOS]: 'Unable to load todos',
  [ErrorType.ADD_TODO]: 'Unable to add a todo',
  [ErrorType.DELETE_TODO]: 'Unable to delete a todo',
};
