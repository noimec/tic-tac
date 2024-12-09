import { Card, CardContent, CardHeader } from "@/shared/ui/card";

export function GameLayout({
  field,
  players,
  status,
}: {
  field?: React.ReactNode;
  status?: React.ReactNode;
  players?: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader>Крестики нолики</CardHeader>
      <CardContent className="flex flex-col gap-4">
        {players}
        {status}
        <div className="flex items-center justify-center">{field}</div>
      </CardContent>
    </Card>
  );
}
