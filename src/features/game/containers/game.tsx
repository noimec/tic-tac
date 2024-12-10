"use client";

import { GameLayout } from "../ui/layout";
import { GamePlayers } from "../ui/players";
import { GameStatus } from "../ui/status";
import { GameField } from "../ui/field";

import { GameId } from "@/kernel/ids";
import { GameDomain } from "@/entities/game";
import { useEventsSource } from "@/shared/lib/sse/client";

export function Game({ gameId }: { gameId: GameId }) {
  const { dataStream, error } = useEventsSource(`/game/${gameId}/stream`, 1);

  const game: GameDomain.GameEntity = {
    id: "1",
    players: [
      {
        id: "1",
        login: "test",
        rating: 1000,
      },
      {
        id: "1",
        login: "test",
        rating: 1000,
      },
    ],
    field: [null, null, null, "O", "X", null, null, null, null],
    status: "inProgress",
  };

  return (
    <div>
      {dataStream}
      {error ? `Ошибка ${error}` : undefined}
    </div>
  );
  return (
    <GameLayout
      players={<GamePlayers game={game} />}
      status={<GameStatus game={game} />}
      field={<GameField game={game} />}
    />
  );
}
