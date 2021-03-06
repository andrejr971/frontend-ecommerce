import { ValidationError } from 'yup';

interface IValidationErros {
  [key: string]: string;
}

export default function getValidationErrors(
  err: ValidationError,
): IValidationErros {
  const validationsErrors: IValidationErros = {};

  err.inner.forEach(error => {
    if (error.path) {
      validationsErrors[error.path] = error.message;
    }
  });

  return validationsErrors;
}
