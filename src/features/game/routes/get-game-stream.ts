import { NextRequest } from "next/server";

import { sseStream } from "@/shared/lib/sse/server";
import { GameId } from "@/kernel/ids";
import { getGameById } from "@/entities/game/server";
import { gameEvents } from "../services/game-events";

export async function getGameStream(
  req: NextRequest,
  { params }: { params: Promise<{ id: GameId }> },
) {
  const { id } = await params;
  const game = await getGameById(id);

  if (!game) {
    console.log(id);
    return new Response(`Game not found`, {
      status: 404,
    });
  }

  const { addCloseListener, response, write } = sseStream(req);

  write(game);

  addCloseListener(
    await gameEvents.addListener(game.id, (e) => {
      write(e.data);
    }),
  );

  return response;
}
