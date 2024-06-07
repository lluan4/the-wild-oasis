import { ThemeProvider } from "styled-components";
import { lightTheme } from "./styles/Theme/light";
import GlobalStyle from "./styles/GlobalStyles";
import AppRouter from "./routes/AppRoutes";

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
