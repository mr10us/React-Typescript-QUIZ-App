import { useLocation } from "react-router-dom";

export const useCurrentPage = () => {
  const { pathname } = useLocation();
  const splittedPathname = pathname.split("/").filter(Boolean);

  return splittedPathname[splittedPathname.length - 1];
};
