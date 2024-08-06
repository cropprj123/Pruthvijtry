import React from "react";
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";

const useLogOut = () => {
  const setUser = useSetRecoilState(userAtom);

  const logout = async () => {
    try {
      const res = await fetch(
        "https://cropify-deploy.onrender.com/api/v1/users/logout",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();

      console.log(data);

      if (data.error) {
        // showToast("Error", data.error, "error");
        console.log("eror in logout hook api", data.error);
        return;
      }

      localStorage.removeItem("user-threads");
      setUser(null);
      // Refresh the page
      window.location.reload();
    } catch (error) {
      console.log("eror in logout hook", data.error);
      //   console.log(error);
    }
  };

  return logout;
};

export default useLogOut;
