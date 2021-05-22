import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CarPurchase from '../pages/CarPurchase';
import CarStatus from '../pages/CarStatus';
import CarList from '../pages/CarList';

const AppEntryPoint = (props) => {
  return (
    <Router>
      <Switch>
        <Route exact path={['/list', '/']} filters={props}>
          <CarList />
        </Route>
        <Route exact path="/purchase">
          <CarPurchase />
        </Route>
        <Route exact path="/status">
          <CarStatus />
        </Route>
      </Switch>
    </Router>
  );
};

export default AppEntryPoint;
