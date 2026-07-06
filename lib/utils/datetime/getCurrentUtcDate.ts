export const getCurrentUtcDate = () => {
  return new Date().toISOString().slice(0, 10);
};
