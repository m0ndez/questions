import { instanceAxios } from "../libs";
import type { User } from "../types/user";

export const getUsers = async (): Promise<User[]> => {
  const { data } = await instanceAxios.get<User[]>("/users");

  return data;
};
