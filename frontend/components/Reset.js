import Form from "./styles/Form";
import useForm from "../lib/useForm";
import gql from 'graphql-tag';
import { useMutation } from "@apollo/client";
import DisplayError from './ErrorMessage';


const RESET_MUTATION = gql`
mutation RESET_MUTATION ($token: String!, $email: String!, $password: String!) {
    redeemUserPasswordResetToken(email: $email, token: $token, password: $password) {
        code
        message
    }
}
`;

function Reset({token}) {
    const {inputs, handleChange, resetForm} = useForm({
        email: '',
        password: '',
        token,
    });

    const [reset, { data, loading, error}] = useMutation(RESET_MUTATION, {
        variables: inputs,
    });

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await reset();
        console.log(res);
        resetForm();
    }
    
    const anotherError = data?.redeemUserPasswordResetToken?.code ? data?.redeemUserPasswordResetToken : undefined;

    return (
        <Form method="post" onSubmit={handleSubmit}>
            <h2>Reset your password</h2>
            <DisplayError error={error || anotherError}/>
            <fieldset>
                {data?.redeemUserPasswordResetToken === null && (
                <p>Success! You can Now sign in</p>
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
                <button type="submit">Request</button>
            </fieldset>
        </Form>
    )
}

export default Reset
