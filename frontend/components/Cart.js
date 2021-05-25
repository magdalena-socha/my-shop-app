
import CardStyles from './styles/CartStyles'
import Supreme from './styles/Supreme'
import { useUser } from './User';
import formatMoney from "../lib/formatMoney"
import calcTotalPrice from "../lib/cartTotalPrice"

const CardItemStyles = styled.li`
    padding: 1rem 0;
    border-bottom: 1px solid var(--lightGrey);
    display: grid;
    grid-template-columns: auto 1fr auto;
    img {
        margin-right: 1rem;
    }
    h3, p {
        margin: 0;
    }
`;

function CartItem ({cartItem}) {
    const {product} = cartItem;
    if(!product) return null;
    return (
        <CardItemStyles>
            <img src = {product?.photo?.image?.publicUrlTransformed}
            alt = {product.name}
            width="100"/>
            <div>
                <h3>{product.name}</h3>
                <p>
                    {formatMoney(product.price * cartItem.quantity)}
                    -
                    <em>{cartItem.quantity} &times; {formatMoney(product.price)} each</em>
                </p>
            </div>
        </CardItemStyles>
    )
}


function Cart() {
    const me = useUser();
    if (!me) return null;
    return (
        <CardStyles open > 
        <header>
            <Supreme> {me.name}'s Cart
            </Supreme>
        </header>
        <ul>
            {me.cart.map(cartItem => (
                <CartItem key={cartItem.id}
                cartItem={cartItem} />
            ))}
        </ul>
        <footer>
            <p>{formatMoney(calcTotalPrice(me.cart))}</p>
        </footer>
        </CardStyles>
    )
}

export default Cart
