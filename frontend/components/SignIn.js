
import Form from "./styles/Form";
import useForm from "../lib/useForm";
import gql from 'graphql-tag';
import { useMutation } from "@apollo/client";
import { CURRENT_USER_QUERY } from './User';
import DisplayError from './ErrorMessage';


const SIGNIN_MUTATION = gql`
mutation SIGNIN_MUTATION ($email: String!, $password: String!) {
    authenticateUserWithPassword( email: $email, password: $password) {
         ...on UserAuthenticationWithPasswordSuccess {
           item {
                id
                email
                name
            }
        } 
        ... on UserAuthenticationWithPasswordFailure {
            code
            message 
        }
    }
}
`;

function SignIn() {
    const {inputs, handleChange, resetForm} = useForm({
        email: '',
        password: '',
    });

    const [signin, { data, loading }] = useMutation(SIGNIN_MUTATION, {
        variables: inputs,
        refetchQueries:  [{query: CURRENT_USER_QUERY}],
    });

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await signin();
        console.log(res);
        resetForm();
    }
    
    const error = data?.authenticateUserWithPassword.__typename === "UserAuthenticationWithPasswordFailure" ? data?.authenticateUserWithPassword : undefined;

    return (
        <Form method="POST" onSubmit={handleSubmit}>
            <h2>Sign in to your account</h2>
            <DisplayError error={error}/>
            <fieldset>
                <label htmlFor="email">
                    Email
                    <input
                        type="email"
                        name="email"
                        placeholder="Your email address"
                        autoComplete="email"
                        value={inputs.email}
                        onChange={handleChange}
                        />
                </label>
                <label htmlFor="password">
                    Password
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        autoComplete="password"
                        value={inputs.password}
                        onChange={handleChange}
                        />
                </label>
                <button type="submit">Log in</button>
            </fieldset>
        </Form>
    )
}

export default SignIn
