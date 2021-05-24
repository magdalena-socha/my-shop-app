import React from 'react'
import Form from "./styles/Form";
import useForm from "../lib/useForm";
import gql from 'graphql-tag';
import { useMutation } from "@apollo/client";
import DisplayError from './ErrorMessage';


const SIGNUP_MUTATION = gql`
mutation SIGNUP_MUTATION ($name: String!, $email: String!, $password: String!) {
    createUser(data: {
        name: $name,
        email: $email,
        password: $password,
    }) {
        id
        name
        email
    }
}
`;

function SignUp() {
    const {inputs, handleChange, resetForm} = useForm({
        email: '',
        name: '',
        password: '',
    });

    const [signup, { data, error, loading }] = useMutation(SIGNUP_MUTATION, {
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
            <h2>Sign Up for an account</h2>
            <DisplayError error={error}/>
            <fieldset>
                {data?.createUser && (
                    <p>Signed up with {data.createUser.email} - Please go ahead and sign in</p>
                )}
            <label htmlFor="name">
                    Your name
                    <input
                        type="name"
                        name="name"
                        placeholder="Your name"
                        autoComplete="name"
                        value={inputs.name}
                        onChange={handleChange}
                        />
                </label>
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
                <button type="submit">Sign up</button>
            </fieldset>
        </Form>
    )
}

export default SignUp
