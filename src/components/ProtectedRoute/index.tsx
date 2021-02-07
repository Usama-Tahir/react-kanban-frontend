import { Route, Redirect } from 'react-router-dom';
import { isAuthenticUser } from '../../lib/validateUser';

const ProtectedRoute = ({ component: Component, ...rest }: any) => {
  const authenticatedUser = isAuthenticUser();
  return (
    <Route
      {...rest}
      render={props => {
        if (authenticatedUser) {
          return <Component {...rest} {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: '/login',
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
