import { forwardRef, useEffect, useRef } from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import IMask from 'imask';
import { useMergeRefs } from '@hooks/useMergeRefs';
import masks from '@utils/masks';

const Input = (
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
) => {
  const innerRef = useRef(null);
  const inputRef = useMergeRefs(ref, innerRef);

  useEffect(() => {
    let inputMask;

    if (mask) {
      inputMask = IMask(inputRef.current, masks[mask]);
    }

    return () => {
      if (inputMask) {
        inputMask.destroy();
      }
    };
  }, [mask, inputRef, name]);

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
};

export default forwardRef(Input);
