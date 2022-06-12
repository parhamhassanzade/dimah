import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import dashRoute from "./Routes/dashboard.Routes";
import { ThemeProvider } from "@mui/material/styles";
import { cacheRtl, theme } from "../src/theme/index";
import { CacheProvider } from "@emotion/react";

function App() {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Router>
            <Switch>
              {dashRoute.map(({ path, exact, Component }, index) => {
                return (
                  <Route
                    key={index}
                    path={path}
                    exact={exact}
                    render={(props) => <Component {...props} />}
                  />
                );
              })}
            </Switch>
          </Router>
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
