export function TabItem({ label, onClick, isActive = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`btn btn--tertiary ${
        isActive ? 'btn--active' : 'btn--opaque'
      }`}
    >
      {label}
    </button>
  );
}
