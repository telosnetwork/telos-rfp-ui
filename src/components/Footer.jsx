import Image from 'next/image';
import builtWithLoveByDetroitLedgerTechnologies from '@images/build-with-love-by-detroit-ledger-technologies.svg';

export function Footer() {
  return (
    <footer className="flex flex-row justify-center items-center px-4 pt-4 pb-8">
      <a
        href="https://detroitledger.tech/"
        target="_blank"
        rel="noreferrer"
        className="md:hover:opacity-70 duration-150"
      >
        <Image
          src={builtWithLoveByDetroitLedgerTechnologies}
          alt="Built with love by Detroit Ledger Technologies"
        />
      </a>
    </footer>
  );
}
