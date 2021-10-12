import { useContext } from "react";
import { AuthContext } from "../AuthContext";

const useProviderAuth = () => {
    return useContext(AuthContext);
};

export default useProviderAuth;