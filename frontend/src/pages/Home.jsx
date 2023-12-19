import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../store/feature/userSlice.js";
import LoginHome from "../components/LoginHome.jsx";
import NoLoginHome from "../components/NoLoginHome.jsx";

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginAction(localStorage.getItem("user")));
  }, [dispatch]);

  const user = useSelector((state) => state.user);

  return user ? <LoginHome /> : <NoLoginHome />;
}
export default Home;
