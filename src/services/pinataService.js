import axios from 'axios';
import csvToJson from 'csvtojson';
import { jwt, baseURL, gatewayURL } from '@configs/pinataConfig';

const pinataApi = axios.create({
  baseURL,
});

pinataApi.interceptors.request.use(async (config) => {
  config.maxBodyLength = 'Infinity';
  config.headers.Authorization = `Bearer ${jwt}`;
  return config;
});

export async function getCSVInformation(IpfsHash) {
  try {
    const { data: file } = await axios.get(`${gatewayURL}/${IpfsHash}`, {
      responseType: 'blob',
    });

    const isServerSide = typeof window === 'undefined';
    const csvString = isServerSide ? file : await file.text();
    const csvJson = await csvToJson().fromString(csvString);

    return csvJson;
  } catch (error) {
    console.log(error);
  }
}

export async function saveFile(file) {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const { data } = await pinataApi.post('/pinning/pinFileToIPFS', formData);
    return data.IpfsHash;
  } catch (error) {
    throw error;
  }
}

export async function deleteFile(IpfsHash) {
  if (!IpfsHash) {
    return;
  }

  try {
    const { data } = await pinataApi.delete(`pinning/unpin/${IpfsHash}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export default pinataApi;
