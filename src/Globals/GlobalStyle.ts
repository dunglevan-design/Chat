import { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`
  body {
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }

  :root{
      --primary-color: #2A8BF2;
      --text-color-primary:  #0D1C2E;
      --text-color-secondary: #707c97;
  }

  #root {
    height: 100vh;
    width: 100vw;
    background: linear-gradient(180deg, #F3F3FB 0%, #FDFBFD 100%);
  }
`; 
 
export default GlobalStyle;