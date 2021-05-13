import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';

const DELETE_PRODUCT_MUTATION = gql`
    mutation DELETE_PRODUCT_MUTATION ($id: ID!){
        deleteProduct(id: $id) {
            id
            name
        }
    } `;

function DeleteProduct({ id, children }) {
    const [deleteProduct, {loading, error}] = useMutation(DELETE_PRODUCT_MUTATION, {
        variables: { id },
    });
    return (
        <button type="button" disabled={loading} onClick={() => {
            if(confirm('Are you sure you want to delete this item?')) {
                deleteProduct().catch( (err) => alert(err.message));
            }
        }}>
            {children}
        </button>
    )
}

export default DeleteProduct
