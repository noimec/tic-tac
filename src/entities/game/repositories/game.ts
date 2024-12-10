import { z } from "zod";

import {
  GameEntity,
  GameIdleEntity,
  GameOverEntity,
  PlayerEntity,
} from "../domain";

import { db } from "@/shared/lib/db";
import { Game, Prisma, User } from "@prisma/client";
import { removePasword } from "@/shared/lib/password";
import { GameId } from "@/kernel/ids";

async function gamesList(where?: Prisma.GameWhereInput): Promise<GameEntity[]> {
  const games = await db.game.findMany({
    where,
    include: {
      winner: true,
      players: true,
    },
  });

  return games.map(dbGameToGameEntity);
}

async function startGame(gameId: GameId, player: PlayerEntity) {
  return dbGameToGameEntity(
    await db.game.update({
      where: { id: gameId },
      data: {
        players: {
          connect: {
            id: player.id,
          },
        },
        status: "inProgress",
      },
      include: {
        winner: true,
        players: true,
      },
    }),
  );
}

async function getGame(
  where?: Prisma.GameWhereInput,
): Promise<GameEntity | undefined> {
  const game = await db.game.findFirst({
    where,
    include: {
      winner: true,
      players: true,
    },
  });

  if (game) {
    return dbGameToGameEntity(game);
  }

  return undefined;
}

async function createGame(game: GameIdleEntity): Promise<GameEntity> {
  const createdGame = await db.game.create({
    data: {
      status: game.status,
      id: game.id,
      field: game.field,
      players: {
        connect: { id: game.creator.id },
      },
    },
    include: {
      players: true,
      winner: true,
    },
  });

  return dbGameToGameEntity(createdGame);
}

const fieldSchema = z.array(z.union([z.string(), z.null()]));

function dbGameToGameEntity(
  game: Game & {
    players: User[];
    winner?: User | null;
  },
): GameEntity {
  const players = game.players.map(removePasword);
  switch (game.status) {
    case "idle": {
      const [creator] = players;
      if (!creator) {
        throw new Error("creator should be in game idle");
      }
      return {
        id: game.id,
        creator: creator,
        status: game.status,
        field: fieldSchema.parse(game.field),
      } satisfies GameIdleEntity;
    }
    case "inProgress":
    case "gameOverDraw":
      return {
        id: game.id,
        players: players,
        status: game.status,
        field: fieldSchema.parse(game.field),
      };
    case "gameOver": {
      if (!game.winner) {
        throw new Error("winner should be in game over");
      }
      return {
        id: game.id,
        players: players,
        status: game.status,
        field: fieldSchema.parse(game.field),
        winner: removePasword(game.winner),
      } satisfies GameOverEntity;
    }
  }
}

export const gameRepository = {
  gamesList,
  createGame,
  getGame,
  startGame,
};
