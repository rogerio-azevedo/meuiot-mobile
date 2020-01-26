import React, { Component } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import CodePush from 'react-native-code-push';
import OneSignal from 'react-native-onesignal';

import { StatusBar } from 'react-native';
import './config/ReactotronConfig';

import { store, persistor } from './store';
import App from './App';

export default class Index extends Component {
  // constructor(props) {
  //   super(props);

  //   OneSignal.init('eec43c23-7d23-4686-87c8-b8a2a1976dfd');

  //   OneSignal.addEventListener('received', this.onReceived);
  //   OneSignal.addEventListener('opened', this.onOpened);
  //   OneSignal.addEventListener('ids', this.onIds);
  // }

  // componentWillUnmount() {
  //   OneSignal.addEventListener('received', this.onReceived);
  //   OneSignal.addEventListener('opened', this.onOpened);
  //   OneSignal.addEventListener('ids', this.onIds);
  // }

  // onReceived = data => {};

  // onOpened = notification => {};

  // onIds = id => {};

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StatusBar barStyle="light-content" backgroundColor="#159957" />
          <App />
        </PersistGate>
      </Provider>
    );
  }
}

// export default CodePush({
//   checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
// })(Index);
