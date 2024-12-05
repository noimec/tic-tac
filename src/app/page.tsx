import { db } from "@/shared/lib/db";
import { Button } from "@/shared/ui/button";
import { Card, CardTitle } from "@/shared/ui/card";

export default async function Home() {
  const games = await db.game.findMany();

  return (
    <div>
      <Button>Hello</Button>
      {games.map((card) => (
        <Card key={card.id}>
          <CardTitle>{card.name}</CardTitle>
        </Card>
      ))}
    </div>
  );
}
