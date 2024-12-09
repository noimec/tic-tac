"use server";

import { z } from "zod";
import { redirect } from "next/navigation";

import { sessionService, verifyUserPassword } from "@/entities/user/server";
import { left, mapLeft } from "@/shared/lib/either";

const formDataSchema = z.object({
  login: z.string().min(3),
  password: z.string().min(3),
});

export const signInAction = async (state: unknown, formData: FormData) => {
  const data = Object.fromEntries(formData.entries());
  const result = formDataSchema.safeParse(data);

  if (!result.success) {
    return left(`${result.error.message}`);
  }

  const verifyUserResult = await verifyUserPassword(result.data);

  if (verifyUserResult.type === "right") {
    await sessionService.addSession(verifyUserResult.value);

    redirect("/");
  }

  return mapLeft(verifyUserResult, (error) => {
    return {
      "user-not-found": "Пользователь не найден",
      "wrong-login-or-password": "Неверный логин или пароль",
    }[error];
  });
};
