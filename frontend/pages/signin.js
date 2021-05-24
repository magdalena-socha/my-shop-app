import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import RequestReset from "../components/RequestReset";
import styled from "styled-components";

const GridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  `;

export default function SignInPage() {
    return (
      <GridStyles>
        <SignIn/>
        <SignUp/>
        <RequestReset/>
      </GridStyles>
    );
  }