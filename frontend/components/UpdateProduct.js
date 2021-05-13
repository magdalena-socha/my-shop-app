import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Form from '../components/styles/Form';
import DisplayError from './ErrorMessage';
import useForm from '../lib/useForm';

const SINGLE_PRODUCT_QUERY = gql`
 query SINGLE_PRODUCT_QUERY( $id: ID!) {
    Product(where: {
        id: $id
    }) {
        id
        name
        price
        description
    }

 }`;

const UPDATE_PRODUCT_MUTATION = gql`
    mutation UPDATE_PRODUCT_MUTATION (
        $id: ID!
        $name: String
        $description: String
        #price: Int
    ) {
        updateProduct (
            id: $id
            data: { name: $name, desciption: $description, price: $price }
        ) {
            id
            name
            description 
            price
        }
    } `;

export default function UpdateProduct( {id} ) {
//1. getting an existing product
    const  { data, error, loading} = useQuery(SINGLE_PRODUCT_QUERY, {
        variables: { id }
    });

//2. getting a mutation to update the product
    const [updateProduct, {data: updateData, error: updateError, loading: updateLoading}] = useMutation(UPDATE_PRODUCT_MUTATION);

    const {inputs, handleChange, clearForm, resetForm} = useForm(data?.Product);
    //     {
    //     name: data.Product.name,
    //     price: data.price,
    //     description: data.description,
    // });
    


// 3. a form that handles the updates

return (
    <Form onSubmit={async (e) => {
        e.preventDefault();
        const res = updateProduct({
            variables: {
                id,
                
                    name: input.name,
                    description: input.description,
                    price: input.price,
                
            },
        });
        // const res = await createProduct();
        // clearForm();
        // Router.push({
        //     pathname: `/product/${res.data.createProduct.id}`,
        //     //query
        // }) 

        //todo: handle submit

    }}>
        <DisplayError error={error || updateError}/>
        <fieldset disabled={updateLoading} aria-busy={updateLoading}>

        <label htmlFor="name">
            Name
            <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={inputs.name}
            onChange= {handleChange}
            />
        </label>

        <label htmlFor="price">
            Price
            <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            value={inputs.price}
            onChange= {handleChange }
            />

        </label>
        <label htmlFor="description">
            Description
            <textarea
                id="description"
                name="description"
                placeholder="Description"
                value={inputs.description}
                onChange= {handleChange }
            />
        </label>

        <button type="submit">UpdateProduct</button>
        </fieldset>
    </Form>
)
  }