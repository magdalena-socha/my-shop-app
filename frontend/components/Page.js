import PropTypes from 'prop-types';
import Header from './Header';
import styled, { createGlobalStyle } from 'styled-components';


const GlobalStyles = createGlobalStyle`
    /* @font-face {
      font-weight: normal;
      font-style: normal;
    } */
    html {
        --red: #ff0000;
        --dark: #393939;
        --maxWidth: 1000px;
        --shadow: 0 12px 24px 0 rgba(0,0,0,.09);
        box-sizing: border-box;
        font-size: 62.5%;
    }
    *, *:before, *:after {
      box-sizing: inherit;
    }
    body {
      font-family: 'myfonthere', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      padding: 0;
      margin: 0;
      font-size: 1.2rem;
      line-height: 2;
    }
    a {
      text-decoration: none;
      color: var(--black);
    }
    a:hover{
      text-decoration: underline;
    }
    
    button {
      font-family: 'myfonthere', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
  `;

  const InnerStyles = styled.div`
    max-width: var(--maxWidth);
    margin: 0 auto;
    padding: 4rem;
  `;

export default function Page({ children }) {
  return (
      <div>
        <GlobalStyles/>
        <Header />
        <InnerStyles>{children}</InnerStyles>
        
      </div>
  );
}

Page.propTypes = {
  cool: PropTypes.string,
  children: PropTypes.any,
};