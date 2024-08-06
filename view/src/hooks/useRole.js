// hooks/useRole.js
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";

const useRole = (roles) => {
  const user = useRecoilValue(userAtom);
  return user && roles.includes(user.role);
};

export default useRole;
