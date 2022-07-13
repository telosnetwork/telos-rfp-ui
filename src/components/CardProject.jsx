export function CardProject({ title, subtitle, message, children, ...rest }) {
  return (
    <div
      className="bg-blue-dark-2 rounded-2xl w-full h-64 p-6 flex flex-col justify-between cursor-pointer duration-300 md:hover:scale-105 md:hover:shadow-xl"
      {...rest}
    >
      <div>
        <h2 className="heading-2">{title}</h2>
        <p className="body-1 capitalize">{subtitle}</p>
      </div>
      {message && (
        <p className="body-1" dangerouslySetInnerHTML={{ __html: message }}></p>
      )}
      {children}
    </div>
  );
}
