import Form from "./styles/Form";
import useForm from "../lib/useForm";
import gql from 'graphql-tag';
import { useMutation } from "@apollo/client";
import DisplayError from './ErrorMessage';


const REQUEST_RESET_MUTATION = gql`
mutation REQUEST_RESET_MUTATION ($name: String!) {
    sendUserPasswordResetLink(email: $email) {
        code
        message
    }
}
`;

function RequestReset() {
    const {inputs, handleChange, resetForm} = useForm({
        email: '',
    });

    const [signup, { data, error, loading }] = useMutation(REQUEST_RESET_MUTATION, {
        variables: inputs,
    });

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await signup();
        console.log(res);
        resetForm();
    }
    
    // const error = data?.authenticateUserWithPassword.__typename === "UserAuthenticationWithPasswordFailure" ? data?.authenticateUserWithPassword : undefined;

    return (
        <Form method="post" onSubmit={handleSubmit}>
            <h2>Request a password reset</h2>
            <DisplayError error={error}/>
            <fieldset>
                {data?.sendPasswordResetLink === null && (
                    <p>Check your email for a link</p>
                )}
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
                <button type="submit">Request</button>
            </fieldset>
        </Form>
    )
}

export default RequestReset
