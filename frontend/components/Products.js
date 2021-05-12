import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Product from './Product';
import styled from 'styled-components';
import Head from 'next/head';


export const ALL_PRODUCTS_QUERY = gql`
query ALL_PRODUCTS_QUERY	{
    allProducts{
      id
      name 
      price
      description
      photo {
        id
        image {
          publicUrlTransformed
        }   
      }
    }
  }
`;

const ProductsListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

export default function Products() {
    const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY);
    if(loading) return <p>Loading..</p>;
    if(error) return <p>Error: {error.message}</p>;
    return (
        <div>
          <Head>
            <title>Nostalgia shop</title>
          </Head>
            <ProductsListStyles>
                {data.allProducts.map(prod => 
                    <Product key={prod.id} product={prod}/>
                )}
            </ProductsListStyles>
        </div>
    )
}