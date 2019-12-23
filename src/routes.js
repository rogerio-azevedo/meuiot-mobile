import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import Painel from '~/pages/Painel';
import Profile from '~/pages/Profile';
import Help from '~/pages/Help';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
          Profile,
        }),
        App: createBottomTabNavigator({
          Painel,
          Help,
        }),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      },
    ),
  );
