import Link from 'next/link';
import NavStyles from '../components/styles/NavStyles';

export default function Nav() {
    return (
     <NavStyles>
         <Link href="/account">Account</Link>
         <Link href="/products">Products</Link>
         <Link href="/sell">Sell</Link>
         <Link href="/orders">Order</Link>
     </NavStyles>
    );
  }