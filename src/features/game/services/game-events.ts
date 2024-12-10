import { GameDomain } from "@/entities/game";
import { GameId } from "@/kernel/ids";
import { EventsChanel } from "@/shared/lib/events";

type GameEvent = {
  type: "game-changed";
  data: GameDomain.GameEntity;
};

type Listener = (game: GameEvent) => void;

class GameEventsService {
  eventsChannel = new EventsChanel("game");

  addListener(gameId: GameId, listener: Listener) {
    return this.eventsChannel.concume(gameId, (data) => {
      listener(data as GameEvent);
    });
  }

  emit(game: GameDomain.GameEntity) {
    return this.eventsChannel.emit(game.id, {
      type: "game-changed",
      data: game,
    } satisfies GameEvent);
  }
}

export const gameEvents = new GameEventsService();
