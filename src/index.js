// index.js
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { library } from "@fortawesome/fontawesome-svg-core";
import roomsReducers from "./store/rooms/rooms.reducers";
import devicesReducers from "./store/devices/devices.reducers";
import uiReducers from "./store/ui/ui.reducers";
import * as serviceWorker from "./serviceWorker";
import fontawesomeIcons from "./utils/fontawesome.icons";
import App from "./App";
import "./styles/style.scss";

/**
 * Supported Fontawesome Icons for Offline usage
 */
library.add(fontawesomeIcons);

/**
 * Redux Setup
 */

// Add DevTools Redux Inspector
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Combine App Reducers
const rootReduce = combineReducers({
  rooms: roomsReducers,
  devices: devicesReducers,
  ui: uiReducers
});

// Create the Redux store
const store = createStore(rootReduce, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();




export default App;
