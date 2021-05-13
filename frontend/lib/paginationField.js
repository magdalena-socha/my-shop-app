
import { PAGINATION_QUERY} from '../components/Pagination';



export default function PaginationField() {
    return {
        keyArgs: false,
        read( existing = [], { args, cache }) {
            const {skip, first } = args;

            //read the number of items on the page from the cache
            const data = cache.readQuery( {query: PAGINATION_QUERY});
            const count = data?._allProductsMeta?.count;
            const page = skip / page + 1;
            const pages = Math.ceil(count / first);

            //check if we have existing items
            const items = existing.slice(skip, skip + first).filter( (x) => x);

            //if there are items && there arent enough items to satisfy how many were requested && its the last page => send it 
            if(items.length && items.length !== first && page === pages) {
                return items;
            }
            if(items.length !== first) {
                //we dont have items so go get it
                return false;
            }

            //if there are items, get them from cache
            if(items.length) {
                return items;
            }

            return false; //fallback

        },
        merge(existing, incoming, {args }) {
            const {skip, first} = args;

            //skipped ones will be null
            const merged = existing ? existing.slice(0) : [];
            for(let i = skip; i < skip + incoming.length; ++i) {
                merged[i] = incoming[i - skip];
            }
            return merged;

        },
    }
}