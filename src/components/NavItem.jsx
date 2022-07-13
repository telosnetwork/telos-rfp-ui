import { useRouter } from 'next/router';
import Link from 'next/link';

export function NavItem({ children, href, ...rest }) {
  const { pathname } = useRouter();
  const isActiveItem = pathname === href;

  return (
    <Link href={href}>
      <a
        className={`nav__item ${isActiveItem ? 'nav__item--active' : ''}`}
        {...rest}
      >
        {children}
      </a>
    </Link>
  );
}
