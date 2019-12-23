import React, { useState, useEffect, useRef } from 'react';
import { signOut } from '~/store/modules/auth/actions';
import { useSelector, useDispatch } from 'react-redux';

import Background from '~/components/Background';
import { updateProfileRequest } from '~/store/modules/user/actions';

import {
  Container,
  Title,
  Form,
  FormInput,
  Separator,
  ButtonContainer,
  SubmitButton,
  BackButton,
  LogOutButton,
} from './styles';

export default function Profile({ navigation }) {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  const emailRef = useRef();
  const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [username, setUsername] = useState(profile.username);
  const [email, setEmail] = useState(profile.email);
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    setOldPassword('');
    setPassword('');
    setConfirmPassword('');
  }, [profile]);

  function handleSubmit() {
    dispatch(
      updateProfileRequest({
        username,
        email,
        oldPassword,
        password,
        confirmPassword,
      }),
    );
  }

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Background>
      <Container>
        <Title>Meu Perfil</Title>
        <Form>
          <FormInput
            icon="person-outline"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Nome Completo"
            returnKeyType="next"
            value={username}
            onChangeText={setUsername}
            onSubmitEditing={() => emailRef.current.focus()}
          />

          <FormInput
            icon="mail-outline"
            keybordType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            ref={emailRef}
            placeholder="Digite seu e-mail"
            returnKeyType="next"
            value={email}
            ref={emailRef}
            onChangeText={setEmail}
            onSubmitEditing={() => passwordRef.current.focus()}
          />

          <Separator />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            ref={oldPasswordRef}
            placeholder="Senha atual"
            returnKeyType="send"
            value={oldPassword}
            onChangeText={setOldPassword}
          />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            ref={passwordRef}
            placeholder="Nova senha"
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={password}
            onChangeText={setPassword}
          />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            ref={confirmPasswordRef}
            placeholder="Confirme a sua senha"
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <ButtonContainer>
            <BackButton onPress={() => navigation.navigate('Painel')}>
              Voltar
            </BackButton>
            <SubmitButton onPress={handleSubmit}>Atualizar Perfil</SubmitButton>
          </ButtonContainer>

          <LogOutButton onPress={handleLogout}>Desconectar</LogOutButton>
        </Form>
      </Container>
    </Background>
  );
}
