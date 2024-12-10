import { gameRepository } from "../repositories/game";
import { PlayerEntity } from "../domain";

import { GameId } from "@/kernel/ids";
import { left, right } from "@/shared/lib/either";

export async function startGame(gameId: GameId, player: PlayerEntity) {
  const game = await gameRepository.getGame({ id: gameId });
  if (!game) {
    return left("game-not-found");
  }

  if (game.status !== "idle") {
    return left("game-status-not-idle" as const);
  }

  if (game.creator.id === player.id) {
    return left("creator-can-not-start-game" as const);
  }

  return right(await gameRepository.startGame(gameId, player));
}
