export const randomSeed = (length: number) => {
  return Array.from({ length }, () =>
    Array.from({ length }, () => Math.round(Math.random()))
  );
};
