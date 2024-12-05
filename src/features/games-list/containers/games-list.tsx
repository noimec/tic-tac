import { Layout } from "../ui/layout";
import { GameCard } from "../ui/game-card";

import { getIdleGames } from "@/entities/game/server";
import { CreateButton } from "./create-button";

export async function GamesList() {
  const games = await getIdleGames();

  return (
    <Layout actions={<CreateButton />}>
      {games.map((game) => (
        <GameCard
          key={game.id}
          rating={game.creator.rating}
          login={game.creator.login}
        />
      ))}
    </Layout>
  );
}
