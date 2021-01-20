import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './components/Home';
import Settings from "./components/Settings";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/user/:idUser">
          <Settings />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
