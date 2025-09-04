import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserFromLocalStorage } from "../../store/authSlice";

function AutoLogin(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserFromLocalStorage());
  }, [dispatch]); // ✅ Added dispatch as a dependency

  return props.children;
}

export default AutoLogin;
     