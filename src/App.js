import React, { useRef, useEffect } from "react";
import { BrowserRouter as Router, Switch, useLocation } from "react-router-dom";
import AppRoute from "./utils/AppRoute";
import ScrollReveal from "./utils/ScrollReveal";
import ReactGA from "react-ga";

// Layouts
import LayoutDefault from "./layouts/LayoutDefault";

// Views
import Home from "./views/Home";
import Registration from "./containers/Registration/Registration";
import Login from "./containers/Login/Login";
// import SignIn from "./views/Signin";
// import SignUp from "./views/Signup";

// Initialize Google Analytics
ReactGA.initialize(process.env.REACT_APP_GA_CODE);

const trackPage = (page) => {
  ReactGA.set({ page });
  ReactGA.pageview(page);
};

const App = () => {
  const childRef = useRef();
  // let location = useLocation();
  // useEffect(() => {
  //   const page = location.pathname;
  //   document.body.classList.add("is-loaded");
  //   childRef.current.init();
  //   trackPage(page);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [location]);

  return (
    <ScrollReveal
      ref={childRef}
      children={() => (
        <Router>
          <Switch>
            <AppRoute exact path="/" component={Home} layout={LayoutDefault} />
            <AppRoute exact path="/Registration" component={Registration} />
            <AppRoute exact path="/Login" component={Login} />
          </Switch>
        </Router>
      )}
    />
  );
};

export default App;
