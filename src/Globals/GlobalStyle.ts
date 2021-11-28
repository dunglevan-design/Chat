import { createGlobalStyle } from "styled-components";

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
    background: var(--bg);
    width: 100vw;
    height: 100vh;
  
  }
  .dark {
    --bg-widget: #2A2E35;
    --bg: #12181B;
    --text-color-primary: white;
    --text-color-secondary: #b2becd;
    --accent-color: #6c6c6c3b;
    --active-color: #414346;

  }
  .light {

    --bg-widget: white;
    --bg: linear-gradient(180deg, #F3F3FB 0%, #FDFBFD 100%); 
    --text-color-primary: #0d1c2e;
    --accent-color: #f2f2f2;
    --active-color: #EAF3FF;
  }
`;

export default GlobalStyle;
