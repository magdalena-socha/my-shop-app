import Link from 'next/link';

export default function Nav() {
    return (
     <nav>
         <Link href="/accout"></Link>
         <Link href="/products"></Link>
         <Link href="/sell"></Link>
         <Link href="/order"></Link>
     </nav>
    );
  }