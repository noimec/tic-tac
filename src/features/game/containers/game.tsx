import { GameId } from "@/kernel/ids";
import { GameLayout } from "../ui/layout";
import { GamePlayers } from "../ui/players";
import { GameDomain } from "@/entities/game";
import { GameStatus } from "../ui/status";
import { GameField } from "../ui/field";

export function Game({ gameId }: { gameId: GameId }) {
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
    <GameLayout
      players={<GamePlayers game={game} />}
      status={<GameStatus game={game} />}
      field={<GameField game={game} />}
    />
  );
}
