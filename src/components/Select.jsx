import { forwardRef } from 'react';
import { FiAlertCircle } from 'react-icons/fi';

const Select = (
  { label, support, error, name, options = [], ...rest },
  ref
) => {
  return (
    <label className="field">
      <select
        {...rest}
        name={name}
        ref={ref}
        className={`field__entry ${error ? 'field__entry--error' : ''}`}
        placeholder={label}
        defaultValue=""
      >
        <option disabled value="" style={{ display: 'none' }}>
          -- Select an option --
        </option>
        {options.map(({ value, label }) => (
          <option key={`${value}${label}`} value={value}>
            {label}
          </option>
        ))}
      </select>
      <span className="field__label">{label}</span>
      {support && <span className="field__support">{support}</span>}
      {error && (
        <>
          <div className="field__error-icon">
            <FiAlertCircle size={20} />
          </div>
          <span className="field__error-text">{error}</span>
        </>
      )}
    </label>
  );
};

export default forwardRef(Select);
