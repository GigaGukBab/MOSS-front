import { useRouteError } from 'react-router-dom';

interface RouteError {
  statusText?: string;
  message?: string;
}

function isRouteError(error: unknown): error is RouteError {
  return (
    error !== null &&
    typeof error === 'object' &&
    ('statusText' in error || 'message' in error)
  );
}

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  let errorMessage = 'Unknown error';
  if (isRouteError(error)) {
    errorMessage = error.statusText || error.message || errorMessage;
  }

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{errorMessage}</i>
      </p>
    </div>
  );
}
