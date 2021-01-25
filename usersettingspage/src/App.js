import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './components/Home';
import NotfFound from "./components/NotfFound";
import Settings from "./components/Settings";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" >
                    <Home />
                </Route>
                <Route path="/customerdata/:idUser" >
                    <Settings />
                </Route>
                <Route component={NotfFound} />
            </Switch>
        </Router>
    );
}

export default App;