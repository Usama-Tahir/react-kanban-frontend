import { applyMiddleware, createStore, compose, Store } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './redux/index';
import { ApplicationState } from './redux';
const middleware = [thunk];
const storeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store: Store<ApplicationState> = createStore(
  rootReducer,
  storeEnhancers(applyMiddleware(...middleware)),
);

export default store;
