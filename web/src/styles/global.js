import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
 }
 @media print {
  @page { margin: 0; }
  body { margin: 1.6cm; }
}

 html, body, #root {
   min-height: 100%;
 }
 body {
   background: #e9e9e9;
   -webkit-font-smoothing: antialiased !important;
 }

 body, input, button {
   color: #222;
   font-size: 14px;
   font-family: Arial, Helvetica, sans-serif;
 }

 button {
   cursor: pointer;
 }
`;
