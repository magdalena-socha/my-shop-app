import Link from 'next/link';
import NavStyles from '../components/styles/NavStyles';
import { useUser } from './User';

export default function Nav() {
    const user = useUser();
    return (
     <NavStyles>
         <Link href="/account">Account</Link>
         {
             user && (
                 <>
                    <Link href="/products">Products</Link>
                    <Link href="/sell">Sell</Link>
                    <Link href="/orders">Order</Link>
                </>
             )
         }
        
     </NavStyles>
    );
  }