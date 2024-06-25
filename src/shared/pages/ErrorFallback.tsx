import GlobalStyle from '../../styles/GlobalStyles';

import * as S from '../styles/ErrorFallback.styles';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <>
      <GlobalStyle />
      <S.StyledErrorFallback>
        <S.Box>
          <h1>Something went wrong 🧐</h1>
          <p>{error.message}</p>
          <button onClick={resetErrorBoundary}>Try again</button>
        </S.Box>
      </S.StyledErrorFallback>
    </>
  );
}

export default ErrorFallback;
