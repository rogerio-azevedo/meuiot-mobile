import React from 'react';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container } from './styles';

export default function SignUp() {
  return (
    <Container>
      <Text>USUÁRIOS</Text>
    </Container>
  );
}

SignUp.navigationOptions = {
  tabBarLabel: 'USUÁRIOS',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="account-circle" size={30} color={tintColor} />
  ),
};
