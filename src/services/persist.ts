import localforage from "localforage";
import sha256 from "crypto-js/sha256";
export const getItem = async (name: string): Promise<any> => {
  return localforage.getItem(sha256(name).toString());
};

export const setItem = async (name: string, value: any) => {
  await localforage.setItem(sha256(name).toString(), value);
};
