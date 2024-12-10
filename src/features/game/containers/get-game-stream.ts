import { sseStream } from "@/shared/lib/sse/server";
import { NextRequest } from "next/server";

export function getGameStream(req: NextRequest) {
  let counter = 1;
  const { addCloseListener, response, write } = sseStream(req);
  const interval = setInterval(() => write(counter++), 1000);
  addCloseListener(() => {
    clearInterval(interval);
  });
  return response;
}
