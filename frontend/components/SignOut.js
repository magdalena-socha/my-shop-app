import gql from 'graphql-tag';
import { useMutation } from "@apollo/client";
import { CURRENT_USER_QUERY } from './User';

const SIGNOUT_MUTATION = gql`
    mutation {
        endSession
    }
`;

function SignOut() {
    const {signout} = useMutation(SIGNOUT_MUTATION, {
        refetchQueries: [{ query: CURRENT_USER_QUERY}],
    });

    return (
        <button type="button" onChange={signout}>
            Sign out
        </button>
    )
}

export default SignOut