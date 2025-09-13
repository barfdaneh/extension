import React from "react";
import { useRouteError, Link } from "react-router-dom";

export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      className="bg-[var(--background)] flex flex-col items-center h-80 pt-4 w-[360px]"
    >
      <h1 className="text-[var(--foreground)] text-lg">Oops!</h1>
      <p className="text-[var(--foreground)]/70">
        Sorry, an unexpected error has occurred.
      </p>
      <p className="text-[var(--foreground)]/70">
        <i>{error.statusText || error.message}</i>
      </p>
      <p className="text-[var(--foreground)]/70">
        <Link to="/">Back to home</Link>
      </p>
    </div>
  );
}
