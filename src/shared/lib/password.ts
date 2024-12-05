// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const removePasword = <T extends { passwordHash: string }>({
  passwordHash: _,
  ...rest
}: T): Omit<T, "passwordHash"> => rest;
