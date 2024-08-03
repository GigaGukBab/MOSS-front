import { useRouteError } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const error = useRouteError();
  console.error(error);

  let errorMessage = 'Unknown error';
  if (isRouteError(error)) {
    errorMessage = error.statusText || error.message || errorMessage;
  }

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>죄송합니다. 페이지를 찾을 수 없습니다.</p>
      <p>
        <i>{errorMessage}</i>
      </p>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        돌아가기
      </button>
    </div>
  );
}
