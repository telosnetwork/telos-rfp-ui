import { useState } from 'react';
import InputFile from '@components/InputFile';
import { UploadCardFile } from '@components/UploadCardFile';
import { saveFile, deleteFile } from '@services/pinataService';

export function UploadFile({
  name: registerName,
  register,
  trigger,
  setValue,
  onFile,
  label,
  ...rest
}) {
  const [fileIpfsHash, setFilesIpfsHash] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { onChange, onBlur, name, ref } = register(registerName, {
    onChange: onUpload,
    setValueAs: (value) => {
      setFilesIpfsHash(value);
      return value;
    },
  });

  async function onDelete() {
    setIsDeleting(true);
    setValue(name, '');
    if (typeof onFile !== 'undefined') {
      onFile(null, '');
    }
    try {
      await deleteFile(fileIpfsHash);
    } catch (error) {
      console.log(JSON.parse(JSON.stringify(error)));
    }
    setIsDeleting(false);
  }

  async function onUpload(event) {
    const result = await trigger(name, { shouldFocus: true });
    if (!result) {
      return;
    }
    setIsUploading(true);
    try {
      const ipfsHash = await saveFile(event.target.files[0]);
      if (typeof onFile !== 'undefined') {
        onFile(event.target.files[0], ipfsHash);
      }
      setValue(name, ipfsHash);
    } catch (error) {
      console.log(JSON.parse(JSON.stringify(error)));
    }
    setIsUploading(false);
  }

  if (isUploading || isDeleting || fileIpfsHash) {
    return (
      <>
        <UploadCardFile
          label={label}
          support={rest.support}
          ipfsHash={fileIpfsHash}
          isUploading={isUploading}
          isDeleting={isDeleting}
        >
          {fileIpfsHash && (
            <button
              type="button"
              className="btn btn--secondary"
              onClick={onDelete}
            >
              Delete
            </button>
          )}
        </UploadCardFile>
      </>
    );
  }

  return (
    <InputFile
      label={label}
      onChange={onChange}
      onBlur={onBlur}
      name={name}
      ref={ref}
      {...rest}
    />
  );
}
