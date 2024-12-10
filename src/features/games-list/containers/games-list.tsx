import Link from "next/link";

import { Layout } from "../ui/layout";
import { GameCard } from "../ui/game-card";
import { CreateButton } from "./create-button";

import { getIdleGames } from "@/entities/game/server";
import { Button } from "@/shared/ui/button";
import { routes } from "@/kernel/routes";

export async function GamesList() {
  const games = await getIdleGames();

  return (
    <Layout actions={<CreateButton />}>
      {games.map((game) => (
        <GameCard
          key={game.id}
          rating={game.creator.rating}
          login={game.creator.login}
          actions={
            <Link href={routes.game(game.id)}>
              <Button>Подключиться</Button>
            </Link>
          }
        />
      ))}
    </Layout>
  );
}
