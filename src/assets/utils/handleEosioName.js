import { Serialize } from 'eosjs';

const types = Serialize.createInitialTypes();

export const nameToUint64 = (name) => {
  let ser = new Serialize.SerialBuffer();
  ser.pushName(name);
  return types.get('uint64').deserialize(ser);
};

export const uint64ToName = (num) => {
  let ser = new Serialize.SerialBuffer();
  types.get('uint64').serialize(ser, num);
  return ser.getName();
};

export function randomEosioName(length = 12) {
  let result = '';
  const validCharacters = '12345abcdefghijklmnopqrstuvxyz';

  for (let i = 0; i < length; i++) {
    result += validCharacters.charAt(
      Math.floor(Math.random() * validCharacters.length)
    );
  }

  return result;
}
