import Link from 'next/link';
import Nav from './Nav';
import styled, { createGlobalStyle } from 'styled-components';

const Logo = styled.h1`
    background: red ;
    font-size: 4rem;
    margin-left: 2 rem;
    position: reltive;
    z-index:2;
    transform: skew(-5deg);
    a {
        color: white;
        text-decoration:none;
        padding: 1rem;
    }
`;

const HeaderStyles = styled.header`
    .bar {
     border-bottom: 10px solid var(--black, black);
     display: grid;
     grid-template-columns: auto 1fr;
     justify-content:space-between;
     align-items: center;
    }
    .sub-bar {
        display: grid;
        grid-template-columns: 1fr auto;
        border-bottom: 10px solid var(--black, black);
    }
    `;

export default function Header() {
    return (
     <HeaderStyles>
         <div className="bar">
             <Logo>
                 <Link href="/">
                 éphémère
                </Link>
             </Logo>
         </div>
         <div className="sub-bar">
             <p>Search</p>
         </div>
         <Nav/>
     </HeaderStyles>
    );
  }