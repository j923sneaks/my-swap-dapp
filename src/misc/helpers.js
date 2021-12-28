export const shortAddress = (address) => `${address.slice(0, 5)}...${address.slice(-5)}`;
export const copyToClipboard = (text) => navigator.clipboard.writeText(text);
