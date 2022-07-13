export function CardUser({ account, children, ...rest }) {
  return (
    <div
      {...rest}
      className="flex flex-row justify-between items-center bg-blue-dark-2 p-6 first-of-type:rounded-t-2xl last-of-type:rounded-b-2xl mb-[1px]"
    >
      <p className="heading-3 text-white">{account}</p>
      {children}
    </div>
  );
}
