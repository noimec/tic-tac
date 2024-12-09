import cuid from "cuid";

import { userRepository } from "../repositories/user";
import { DEFAULT_RATING } from "../domain";
import { passwordService } from "./password";

import { left, right } from "@/shared/lib/either";

export const createUser = async ({
    login,
    password,
}: {
    login: string;
    password: string;
}) => {
    const userWithLogin = await userRepository.getUser({ login });

    if (userWithLogin) {
        return left("user-login-exists" as const);
    }

    const { hash, salt } = await passwordService.hashPassword(password)

    const user = await userRepository.saveUser({
        id: cuid(),
        login,
        rating: DEFAULT_RATING,
        passwordHash: hash,
        salt: salt
    });

    return right(user)
};
