import { ThemeProvider } from "styled-components";
import router from "./routes/Routes";
import { lightTheme } from "./styles/Theme/light";
import GlobalStyle from "./styles/GlobalStyles";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
