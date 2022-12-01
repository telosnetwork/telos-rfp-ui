import { forwardRef, useEffect, useRef, useImperativeHandle } from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import IMask from 'imask';
import masks from '@utils/masks';

function InputComponent(
  {
    label,
    support,
    error,
    type = 'text',
    mask,
    onChange,
    onBlur,
    name,
    ...rest
  },
  ref
) {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => inputRef?.current);

  useEffect(() => {
    let inputMask;

    if (inputRef.current && mask) {
      inputMask = IMask(inputRef.current, masks[mask]);
    }

    return () => {
      if (inputMask) {
        inputMask.destroy();
      }
    };
  }, [mask, inputRef]);

  return (
    <label className="field">
      <input
        {...rest}
        name={name}
        ref={inputRef}
        onChange={onChange}
        onBlur={onBlur}
        type={type}
        className={`field__entry ${error ? 'field__entry--error' : ''}`}
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

export const Input = forwardRef(InputComponent);
