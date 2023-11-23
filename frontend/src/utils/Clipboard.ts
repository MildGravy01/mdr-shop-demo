export const copyToClipboard = (copy: string, callback?: () => void) => {
  navigator.clipboard.writeText(copy);
  callback?.call(this);
};
