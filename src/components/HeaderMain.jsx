import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';

import { Nav } from '@components/Nav';

import logoImg from '@images/telos-logo.svg';

export function HeaderMain() {
  const [showNav, setShowNav] = useState(false);

  return (
    <header
      className={`w-full bg-blue-dark-1/50 backdrop-blur-sm border-b border-blue-dark-2 top-0 sticky z-10 pt-[0.875rem] pb-[calc(0.875rem-1px)] ${
        showNav ? 'h-screen md:h-auto' : ''
      }`}
    >
      <div className="container flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="flex-none w-full md:w-auto flex flex-row justify-between items-center">
          <Link href="/">
            <a>
              <Image src={logoImg} alt="Logo Telos Build" />
            </a>
          </Link>
          <button
            type="button"
            className="p-[0.625rem] md:hidden"
            onClick={() => setShowNav(!showNav)}
          >
            {showNav ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
        <div className="flex-none">
          <Nav showNav={showNav} setShowNav={setShowNav} />
        </div>
      </div>
    </header>
  );
}
