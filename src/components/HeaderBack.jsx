import { useRouter } from 'next/router';
import { FiArrowLeft } from 'react-icons/fi';

export function HeaderBack({ href, children }) {
  const router = useRouter();

  function handleBack() {
    if (!!href) {
      if (typeof href === 'string') {
        router.push(href);
      } else {
        href();
      }
    } else {
      router.back();
    }
  }

  return (
    <header className="w-full bg-blue-dark-1/50 backdrop-blur-sm border-b border-blue-dark-2 top-0 sticky pt-[0.875rem] pb-[calc(0.875rem-1px)] z-10">
      <div className="container flex flex-row justify-between items-center">
        <a className="btn btn--tertiary btn--square" onClick={handleBack}>
          <FiArrowLeft size={24} />
        </a>
        {children && <div className="flex flex-row">{children}</div>}
      </div>
    </header>
  );
}
