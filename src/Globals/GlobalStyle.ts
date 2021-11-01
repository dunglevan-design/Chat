import { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Poppins', sans-serif;
  }

  :root{
      --primary-color: #2A8BF2;
      --text-color-primary:  #0D1C2E;
      --text-color-secondary: #707c97;
  }

  #root {
    background: linear-gradient(180deg, #F3F3FB 0%, #FDFBFD 100%);
    width: 100vw;
    height: 100vh;
  }
`; 
 
export default GlobalStyle;