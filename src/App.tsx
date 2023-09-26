import { ThemeProvider } from "styled-components";
import { Initial } from "./routes";
import { GlobalStyle } from "./styles/global";
import { defaultTheme } from './styles/themes/default'

export const App = () => {
  return (   
    <>
     <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
 
 <Initial />
    </ThemeProvider>
   </>
  );
};
