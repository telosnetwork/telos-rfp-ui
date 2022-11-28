import axios from 'axios';
import csvToJson from 'csvtojson';
import { fileURL } from '@configs/telosConfig';

export async function showCsvFileService(IpfsHash) {
  try {
    const { data: file } = await axios.get(`${fileURL}/${IpfsHash}`, {
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
