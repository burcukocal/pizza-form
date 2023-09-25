import './App.css';
import { Switch, Route } from "react-router-dom";
import HomePage from './page/HomePage';
import OrderPage from './page/OrderPage';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route>
          <OrderPage />
        </Route>
      </Switch>
     
    </div>
  );
}

export default App;
