import dayjs from "dayjs/esm";
import utc from "dayjs/esm/plugin/utc";

dayjs.extend(utc);

export const getCurrentUtcDate = () => {
  return dayjs.utc().format("YYYY-MM-DD");
};
