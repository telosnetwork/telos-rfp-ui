import { forwardRef } from 'react';
import { FiAlertCircle } from 'react-icons/fi';

function TextareaComponent({ label, support, error, ...rest }, ref) {
  return (
    <label className="field">
      <textarea
        ref={ref}
        {...rest}
        className={`field__entry ${error ? 'field__entry--error' : ''}`}
        rows={5}
        placeholder={label}
      />
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
}

export const Textarea = forwardRef(TextareaComponent);
