import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Product from './Product';
import styled from 'styled-components';
import Head from 'next/head';
import { perPage } from '../config';


export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY($skip: Int = 0, $first: Int)	{
      allProducts (first: $first, skip: $skip) {
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

export default function Products( {page} ) {
    const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
      variables: {
        skip: page * perPage - perPage,
        first: perPage,
      },
    });
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