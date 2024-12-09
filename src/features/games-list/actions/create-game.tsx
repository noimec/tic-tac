"use server";

import { redirect } from "next/navigation";

import { createGame } from "@/entities/game/server";
import { left } from "@/shared/lib/either";
import { getCurrentUser } from "@/entities/user/server";

export const createGameAction = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return left("user-not-found" as const);
  }
  const gameResult = await createGame(user);

  if (gameResult.type === "right") {
    redirect(`/game/${gameResult.value.id}`);
  }

  return gameResult;
};
