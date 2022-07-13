export function Timeline({ afterWidth = 'after:w-full' }) {
  return (
    <div
      className={`sticky top-[4.5rem] w-full h-2 bg-blue-dark-2 z-10
        after:content-[''] after:absolute after:bg-gradient-purple after:h-full after:top-0 after:left-0 ${afterWidth}`}
    ></div>
  );
}
