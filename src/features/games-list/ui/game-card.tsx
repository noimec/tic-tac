import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/shared/ui/card";
import { ReactNode } from "react";

export function GameCard({
  login,
  rating,
  actions,
}: {
  login: string;
  rating: number;
  actions: ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Игра с : {login}</CardTitle>
      </CardHeader>
      <CardContent>Рейтинг: {rating}</CardContent>
      <CardFooter>{actions}</CardFooter>
    </Card>
  );
}
