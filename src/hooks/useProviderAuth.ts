import { useContext } from "react";
import { AuthContext } from "../AuthProvider";

const useProviderAuth = () => {
    return useContext(AuthContext);
};

export default useProviderAuth;