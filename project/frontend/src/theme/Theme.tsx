import { FC } from "react"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { base } from "./base"

export const Theme: FC = ({children}) => {
  const theme = createTheme(base)
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}