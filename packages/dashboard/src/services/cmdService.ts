import { Command } from "@/types/Command";
import { axiosInstance } from "./AxiosInstance";

export const getCommands = async ({
  cursor,
  take,
}: {
  cursor: string | null;
  take: number;
}): Promise<Command[]> => {
  const cursorParam = cursor ? `&cursor=${cursor}` : "";
  const response = await axiosInstance.get<Command[]>(
    `/commands?take=${take}${cursorParam}`
  );
  return response.data;
};
