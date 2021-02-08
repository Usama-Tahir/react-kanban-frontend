import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Kanban from './components/Kanban';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './components/Register';

const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <ProtectedRoute exact path="/" component={Kanban} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </Router>
  );
};
export default Routes;
