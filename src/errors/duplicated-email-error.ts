import { Error } from '../protocols';

export function duplicatedEmailError(): Error {
  return {
    name: 'DuplicatedEmailError',
    message: 'There is already an user with given email',
  };
}
