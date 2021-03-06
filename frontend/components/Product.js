import ItemStyles from '../components/styles/ItemStyles';
import Title from '../components/styles/Title';
import PriceTag from '../components/styles/PriceTag';
import formatMoney from '../lib/formatMoney';
import Link from 'next/link';
import DeleteProduct from './DeleteProduct';


export default function Product( {product} ) {
    return (
        <ItemStyles>
            <img
            src = {product?.photo?.image?.publicUrlTransformed}
            alt = {product.name}
            />
            <Title>
                <Link href= {`/product/${product.id}`}>
                    {product.name}
                </Link>
            </Title>
            <PriceTag>
                {formatMoney(product.price)}
            </PriceTag>
            <p>{product.description}</p>
            <div className="ButtonList">
                <Link href={
                    {
                        pathname: '/update',
                        query: {
                            id: product.id,
                        },
                    }
                }> Edit
                </Link>
                <DeleteProduct id={product.id}>Delete</DeleteProduct>
            </div>
        </ItemStyles>
    )
}