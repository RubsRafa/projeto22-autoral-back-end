import { Error } from '../protocols';

export function invalidDataError(details: string[]): invalidError {
  return {
    name: 'InvalidDataError',
    message: 'Invalid data',
    details,
  };
}

type invalidError = Error & {
  details: string[];
};
