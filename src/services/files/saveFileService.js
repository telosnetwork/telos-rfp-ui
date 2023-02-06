import axios from 'axios';

export async function saveFileService(file) {
  const formData = new FormData();
  formData.append('file', file);

  const { data } = await axios.post(
    `${window.location.origin}/api/files/upload`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return data.ipfsHash;
}
