import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CarPurchase from '../pages/CarPurchase';
import CarStatus from '../pages/CarStatus';
import CarList from '../pages/car-list/CarList';
import PageWrapper from '../components/page-wrapper/PageWrapper';

const AppEntryPoint = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={['/list', '/']}>
          <PageWrapper>
            <CarList />
          </PageWrapper>
        </Route>
        <Route exact path="/purchase/:id">
          <PageWrapper>
            <CarPurchase />
          </PageWrapper>
        </Route>
        <Route exact path="/status">
          <PageWrapper>
            <CarStatus />
          </PageWrapper>
        </Route>
      </Switch>
    </Router>
  );
};

export default AppEntryPoint;
