import { init } from 'emailjs-com';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CarPurchase from '../pages/car-purchase/CarPurchase';
import CarStatus from '../pages/car-status/CarStatus';
import CarList from '../pages/car-list/CarList';
import PageWrapper from '../components/page-wrapper/PageWrapper';

const AppEntryPoint = () => {
  init('cc2e35faba6f5d92441e1ee67a4a523d');

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
        <Route exact path="/status/:carId">
          <PageWrapper>
            <CarStatus />
          </PageWrapper>
        </Route>
      </Switch>
    </Router>
  );
};

export default AppEntryPoint;
