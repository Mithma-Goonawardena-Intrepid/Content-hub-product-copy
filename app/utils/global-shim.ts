import { isBrowser } from "../../lib/utils/isBrowser";

const setGlobalShim = () => {
  if (isBrowser) {
    window.global ||= window;
  }
};

setGlobalShim();
