import React from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';
import { Text } from 'react-native';

import {
  Container,
  VersionText,
  WelcomeText,
  SupportText,
  EmailContainer,
  PhoneContainer,
  EmailText,
  PhoneText,
} from './styles';

export default function Help() {
  return (
    <Background>
      <Container>
        <VersionText>Versão: 1.01</VersionText>
        <WelcomeText>Bem vindo ao meuIOT!</WelcomeText>
        <SupportText>
          Sinta-se a vontade para fazer contato conosco para esclarecimento de
          dúvidas ou sugestões de melhorias.
        </SupportText>

        <EmailContainer>
          <Icon name="mail-outline" size={25} color="#fff" />
          <EmailText>: rogerio@rogerioazevedo.net</EmailText>
        </EmailContainer>

        <PhoneContainer>
          <Icon name="call" size={25} color="#fff" />
          <PhoneText>: +55 (65) 99997-3500</PhoneText>
        </PhoneContainer>
      </Container>
    </Background>
  );
}

Help.navigationOptions = {
  tabBarLabel: 'HELP',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="help-outline" size={30} color={tintColor} />
  ),
};
