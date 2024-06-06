import "styled-components";
import { lightTheme } from "../styles/Theme/light";

// convert theme to type format
type ThemeType = typeof lightTheme;

declare module "styled-components" {
  // by default, "DefaultTheme" from styled components has no type informed
  // when you pass some type om this, you can access those theme variables on entire application
  export interface DefaultTheme extends ThemeType {}
}
