import React from 'react';
import Link from 'next/link';
import PaginationStyles from '../components/styles/PaginationStyles';
import gql from 'graphql-tag';
import DisplayError from './ErrorMessage';
import {perPage} from '../config';
import { useQuery } from "@apollo/client";
import Head from 'next/head';

export const PAGINATION_QUERY = gql`
    query PAGINATION_QUERY {
        _allProductsMeta {
            count
        }
    }
`;

function Pagination( {page} ) {

    const {error, loading, data} = useQuery(PAGINATION_QUERY);
    if (loading) return <p>Loading..</p>;
    if (error) return <DisplayError error={error}/>;
    
    const count = data._allProductsMeta.count;
    const pageCount = Math.ceil(count / perPage);
   
    return (
        <PaginationStyles>
            <Head> 
                <title>Nostalgia - Page {page}</title>
            </Head>

            <Link href={`/products/${page -1}`} aria-disabled={page == 1}>
                <a aria-disabled={page == 1 }>prev</a>
            </Link>

                <p> Page {page} of {pageCount}</p>
                <p> {count} items</p>

            <Link href={`/products/${page +1}`}>
                <a aria-disabled={page == pageCount }>next</a>
            </Link>

        </PaginationStyles>
    )
}

export default Pagination
