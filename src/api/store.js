import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from "redux-saga";
import reducers from './reducers';
import sagas from "./sagas";

import { sessionService } from 'redux-react-session';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

export function storeConfigure (initialState) {

    const store = createStore(
        reducers,
        initialState,
        compose(applyMiddleware(...middlewares))
    );
    sessionService.initSessionService(store);
    
    sagaMiddleware.run(sagas);

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers');
            store.replaceReducer(nextRootReducer);
        });
    }
    
    return store;
}