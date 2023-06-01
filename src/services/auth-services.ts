import { duplicatedEmailError } from "../errors";
import { UserType } from "../protocols";
import { findUserEmail, singUp } from "../repositories";
import bcrypt from 'bcrypt';

export async function createUser(user: UserType) {
    const userExist = await findUserEmail(user.email);
    if (userExist) throw duplicatedEmailError();

    const hashedPassword = await bcrypt.hash(user.password, 12)
    return await singUp(user, hashedPassword);
}