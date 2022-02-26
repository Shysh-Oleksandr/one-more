import { createGlobalStyle } from "styled-components";
import { ThemeType } from "./Themes";

export const GlobalStyles = createGlobalStyle<{ theme: ThemeType }>`
  body {
    background: ${({ theme }) => theme.body};
    transition: all 0.25s linear;
  }
  `;
