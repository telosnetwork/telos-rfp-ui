import { useState } from 'react';
import { useAuth } from '@hooks/useAuth';
import { FiChevronDown } from 'react-icons/fi';

import { NavItem } from '@components/NavItem';

export function Nav({ showNav, setShowNav }) {
  const [navDropdown, setNavDropdown] = useState(false);
  const { user, isAuthenticated, isAdministrator, signIn, signOut } = useAuth();

  return (
    <nav
      className={`nav ${showNav ? 'nav--active' : ''} ${
        navDropdown ? 'nav--mask' : ''
      }`}
      onClick={() => {
        if (navDropdown) {
          setNavDropdown(false);
        }
      }}
    >
      <NavItem href="/" onClick={() => setShowNav(false)}>
        Projects
      </NavItem>
      {isAdministrator && (
        <NavItem href="/program-managers" onClick={() => setShowNav(false)}>
          Program Managers
        </NavItem>
      )}
      {isAuthenticated ? (
        <div
          className={`nav__dropdown ${
            navDropdown ? 'nav__dropdown--active' : ''
          }`}
        >
          <div
            className="nav__dropdown-control"
            onClick={() => setNavDropdown(!navDropdown)}
          >
            <span className="nav__item">{user}</span>
            <FiChevronDown size={20} />
          </div>
          <div className="nav__dropdown-list">
            <span
              className="nav__item"
              onClick={() => {
                signOut();
                setNavDropdown(false);
              }}
            >
              Sign Out
            </span>
          </div>
        </div>
      ) : (
        <span
          className="nav__item"
          onClick={() => {
            signIn();
            setNavDropdown(false);
          }}
        >
          Login
        </span>
      )}
    </nav>
  );
}
