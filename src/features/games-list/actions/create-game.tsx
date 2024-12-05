"use server";

import { redirect } from "next/navigation";

import { createGame } from "@/entities/game/server";
import { db } from "@/shared/lib/db";
import { left } from "@/shared/lib/either";

export const createGameAction = async () => {
  const user = await db.user.findFirst();

  if (!user) {
    return left("user-not-found" as const);
  }
  const gameResult = await createGame(user);

  if (gameResult.type === "right") {
    redirect(`/game/${gameResult.value.id}`);
  }

  return gameResult;
};
