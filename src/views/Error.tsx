import { useRouteError } from "react-router-dom";

export type ErrorType = {
  statusText?: string;
  message?: string;
}

export function ErrorView() {
  const error = useRouteError() as ErrorType;
  console.error(error);

  return (
    <main>
      <h1>Oй, ошибка!</h1>
      <p>{error.statusText || error.message}</p>
    </main>
  );
}
