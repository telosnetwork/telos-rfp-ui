import axios from 'axios';

export async function deleteFileService(ipfsHash) {
  if (!ipfsHash) {
    return;
  }

  const { data } = await axios.delete(
    `${window.location.origin}/api/files/${ipfsHash}`
  );

  return data;
}
