
import { Switch, Route,BrowserRouter, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Fund from './pages/Fund';

import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import Compound from "./pages/Upgrade";
import Transaction from "./pages/Tx";
import UserProfile from "./pages/UserProfile";
import Withdraw from "./pages/Withdraw";
import Referrals from "./pages/Referrals";
import Login from "./pages/SignIn";
import Upgrade from "./pages/Upgrade";
import Ledger from "./pages/Ledger";
import Upgrades from "./pages/Upgrades";
import Plans from "./pages/Plans";

const user = JSON.parse(localStorage.getItem("user"));


function App() {
  return (
    <div className="App">
      <BrowserRouter>
   
      <Main>
          <Route exact path="/dashboard" component={Home} />
          <Route exact path="/Upgrade" component={Upgrade} />
          <Route exact path="/Ledger" component={Ledger} />
          <Route exact path="/Plans" component={Plans} />
          <Route exact path="/Upgrades" component={Upgrades} />
          <Route exact path="/Tx" component={Transaction} />
          <Route exact path="/Fund" component={Fund} />
          <Route exact path="/Withdraw" component={Withdraw} />
          <Route exact path="/Account" component={UserProfile} />
          <Route exact path="/Downline" component={Referrals} />
          <Redirect from="/app" to="/dashboard" />
        </Main>
    
    
      </BrowserRouter>
    </div>
  );
}

export default App;
