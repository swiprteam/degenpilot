export const shortenAddress = (address, chars = 4) => {
  const start = address.slice(0, chars);
  const end = address.slice(-chars);
  return `${start}...${end}`;
};
