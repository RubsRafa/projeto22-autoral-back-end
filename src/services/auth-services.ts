import { duplicatedEmailError, notFoundUserError } from "../errors";
import { SignInParams, UserType } from "../protocols";
import { createSession, findUserEmail, singUp } from "../repositories";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export async function createUser(user: UserType) {
    const userExist = await findUserEmail(user.email);
    if (userExist) throw duplicatedEmailError();

    const hashedPassword = await bcrypt.hash(user.password, 12)
    return await singUp(user, hashedPassword);
}

export async function loginUser(user: SignInParams) {
    const userInfo = await validateInfo(user);
    const token = jwt.sign({ id: userInfo.id}, process.env.JWT_SECRET);
    await createSession(userInfo.id, token);

    return token;
}

async function validateInfo(user: SignInParams) {
    const userExist = await findUserEmail(user.email);
    if (!userExist) throw notFoundUserError();

    const validPassword = await bcrypt.compare(user.password, userExist.password);
    if (!validPassword) throw notFoundUserError();
    return userExist;
}