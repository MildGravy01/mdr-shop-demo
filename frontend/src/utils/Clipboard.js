export const copyToClipboard = (copy, callback) => {
  navigator.clipboard.writeText(copy);
  callback?.call();
};
