import "./main.scss";
import { Routes } from "react-router-dom";
import { useEffect, createContext } from 'react';

/* Route Config */
import AuthRoute from "@pages/auths/Route";
import HomeRoute from "@pages/home/Route";

import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '@actions/user';

export const RootContext = createContext();

function App() {
  const dispatch = useDispatch();
  const store = useSelector(store => store)
  useEffect(() => {
    dispatch(userActions.authenToken())
  }, [])

  return (
    <RootContext.Provider value={{
      dispatch,
      userStore: store.userStore,
      userActions
    }}>
      <Routes>
        {AuthRoute}
        {HomeRoute}
      </Routes>
    </RootContext.Provider>
  );
}

export default App;
