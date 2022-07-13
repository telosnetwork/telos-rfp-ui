import {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from 'react';
import { createPortal } from 'react-dom';
import { FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ title, support, children }, ref) => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const openModal = useCallback(() => {
    setVisible(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setVisible(false);
    document.body.style.overflow = 'initial';
  }, []);

  useImperativeHandle(ref, () => {
    return {
      openModal,
      closeModal,
    };
  });

  if (!mounted) {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {visible && (
        <div className="w-screen h-screen fixed top-0 left-0 flex items-center justify-center z-50 pt-8 md:pb-8">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full fixed top-0 left-0 bg-black bg-opacity-60 cursor-pointer z-10"
            onClick={closeModal}
          />
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full max-h-full overflow-auto bg-blue-dark-1 rounded-lg shadow-2xl z-20 max-w-xl"
          >
            <header className="flex flex-row justify-between items-start p-6 border-b border-blue-dark-2 bg-blue-dark-1 sticky top-0">
              <div>
                <h2 className="heading-2">{title}</h2>
                {support && <p className="body-1">{support}</p>}
              </div>
              <button
                type="button"
                className="btn btn--tertiary btn--square"
                onClick={closeModal}
              >
                <FiX size={24} />
              </button>
            </header>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.getElementById('modal')
  );
};

export default forwardRef(Modal);
