export function HeaderPage({ title, subtitle, children }) {
  return (
    <header className="container flex flex-row justify-between items-center py-8">
      <div>
        <h1 className="heading-1 py-1 md:py-[0.125rem]">{title}</h1>

        {subtitle && (
          <p
            className="body-1"
            dangerouslySetInnerHTML={{ __html: subtitle }}
          ></p>
        )}
      </div>
      {children && <div className="flex flex-row">{children}</div>}
    </header>
  );
}
