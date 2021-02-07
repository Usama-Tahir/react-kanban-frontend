import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './components/Register/Login';

const A: React.FC = () => <>Hello</>;
const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <ProtectedRoute exact path="/" component={A} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </Router>
  );
};
export default Routes;
