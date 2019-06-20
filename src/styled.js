import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  /* Remove banana-yellow bg from autofill field */
  input:-webkit-autofill {
    transition: background-color 5000s ease-in-out 0s !important;
  }

  .primary-gradient-bg{
    background: rgba(47,130,237,1);
    background: -moz-linear-gradient(left, rgba(47,130,237,1) 0%, rgba(86,203,242,1) 100%);
    background: -webkit-gradient(left top, right top, color-stop(0%, rgba(47,130,237,1)), color-stop(100%, rgba(86,203,242,1)));
    background: -webkit-linear-gradient(left, rgba(47,130,237,1) 0%, rgba(86,203,242,1) 100%);
    background: -o-linear-gradient(left, rgba(47,130,237,1) 0%, rgba(86,203,242,1) 100%);
    background: -ms-linear-gradient(left, rgba(47,130,237,1) 0%, rgba(86,203,242,1) 100%);
    background: linear-gradient(to right, rgba(47,130,237,1) 0%, rgba(86,203,242,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#2f82ed', endColorstr='#56cbf2', GradientType=1 );
  }
  .primary-gradient-text{
    background: rgba(47,130,237,1);
    background: -moz-linear-gradient(left, rgba(47,130,237,1) 0%, rgba(86,203,242,1) 100%);
    background: -webkit-gradient(left top, right top, color-stop(0%, rgba(47,130,237,1)), color-stop(100%, rgba(86,203,242,1)));
    background: -webkit-linear-gradient(left, rgba(47,130,237,1) 0%, rgba(86,203,242,1) 100%);
    background: -o-linear-gradient(left, rgba(47,130,237,1) 0%, rgba(86,203,242,1) 100%);
    background: -ms-linear-gradient(left, rgba(47,130,237,1) 0%, rgba(86,203,242,1) 100%);
    background: linear-gradient(to right, rgba(47,130,237,1) 0%, rgba(86,203,242,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#2f82ed', endColorstr='#56cbf2', GradientType=1 );

    color:transparent !important;
    -webkit-background-clip: text;
    background-clip: text;
  }
  * {
    box-sizing: border-box;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
  }
  html,body {
    margin: 0 !important;
    scroll-behavior: smooth;
  }
  body{
    /* position: fixed; */
    min-height: 100vh;
  }
  img {
    display: block;
    margin: auto;
  }
  table {
    width: 100%;
  }

  .no-box-shadow{
    box-shadow: none !important;
  }
`;

export default GlobalStyles;
