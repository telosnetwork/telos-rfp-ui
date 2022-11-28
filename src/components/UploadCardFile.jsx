import { FiFile } from 'react-icons/fi';
import { fileURL } from '@configs/telosConfig';

export function UploadCardFile({
  label,
  support,
  ipfsHash,
  isUploading,
  isDeleting,
  children,
}) {
  return (
    <>
      <span className="block font-medium text-white text-base mb-2">
        {label}
      </span>
      <div className="flex flex-row items-center justify-between bg-blue-dark-2 p-6 rounded-lg">
        <div className="flex-1 flex flex-row items-center pr-4 overflow-hidden">
          <div className="bg-blue-dark-3 p-3 rounded-full mr-4">
            {isUploading || isDeleting ? (
              <div className="loader-medium"></div>
            ) : (
              <FiFile size={20} />
            )}
          </div>
          {isUploading && (
            <span className="font-medium text-white text-base">
              Uploading...
            </span>
          )}
          {isDeleting && (
            <span className="font-medium text-white text-base">
              Deleting...
            </span>
          )}
          {ipfsHash && (
            <a
              href={`${fileURL}/${ipfsHash}/?preview=1`}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-white text-base truncate link"
            >
              {ipfsHash}
            </a>
          )}
        </div>
        {children && <div className="flex-none">{children}</div>}
      </div>
      {support && (
        <span className="block text-sm font-light text-blue-light mt-2">
          {support}
        </span>
      )}
    </>
  );
}
