export const login = async (
  username: string,
  password: string
): Promise<boolean> => {
  if (username === "demo" && password === "demo") {
    return true;
  }
  return false;
};
