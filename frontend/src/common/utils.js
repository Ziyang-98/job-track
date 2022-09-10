import dayjs from "dayjs";

export const convertStringToDayjs = (string) => {
  if (string === null) {
    return null;
  }

  return dayjs(string, "DD/MM/YYYY");
};
