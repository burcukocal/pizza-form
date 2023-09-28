import './App.css';
import { Switch, Route } from "react-router-dom";
import HomePage from './page/HomePage';
import OrderPage from './page/OrderPage';
import SuccessPage from './page/SuccessPage';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/pizza">
          <OrderPage />
        </Route>
        <Route>
          <SuccessPage path="/success" />
        </Route>
      </Switch>
     
    </div>
  );
}

export default App;
