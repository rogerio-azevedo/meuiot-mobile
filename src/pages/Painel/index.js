import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '~/store/modules/auth/actions';
import { Alert } from 'react-native';

import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';

import {
  Container,
  HeaderContainer,
  AvatarContainer,
  MenuContainer,
  WelcomeText,
  TermometerText,
  DeviceContainer,
  DeviceItem,
  StatusContainer,
  TabText,
  CameraContainer,
  Camera,
} from './styles';
import api from '~/services/api';

export default function Painel({ navigation }) {
  const dispatch = useDispatch();
  const [devices, setDevices] = useState([]);
  const [channels, setChannels] = useState([]);
  const [swhState, setSwtState] = useState({});

  const profile = useSelector(state => state.user.profile);
  const clienteId = profile.cliente;

  useEffect(() => {
    (async () => {
      const response = await api.get('painel', {
        params: {
          cliente: clienteId,
          dev: swhState.device,
          ste: swhState.state,
        },
      });

      setDevices(response.data.devices);
      setChannels(response.data.channels);
    })().catch(err => {
      console.error(err);
    });
  }, [swhState]);

  handleSwitch = clicked => {
    const swtc = {
      device: clicked.device,
      state: clicked.type === 'mom' ? true : !clicked.state,
    };
    console.tron.log(swtc);
    setSwtState(swtc);
  };

  handlelogOut = () => {
    dispatch(signOut());
  };

  // handleAlert = () => {
  //   let alert = 'Version: 1.01';

  //   Alert.alert(alert);
  // };

  return (
    <Background>
      <Container>
        <HeaderContainer>
          <MenuContainer>
            <Icon name="short-text" size={30} color="#fff" />
          </MenuContainer>
          <AvatarContainer onPress={() => navigation.navigate('Profile')}>
            <Icon name="account-circle" size={35} color="#155799" />
          </AvatarContainer>
        </HeaderContainer>

        <WelcomeText>Olá, {profile.username}</WelcomeText>
        <TermometerText>Temperatura externa: 37°C</TermometerText>

        <CameraContainer>
          {channels &&
            channels.map(item => (
              <Camera key={item.id}>
                <WebView
                  originWhitelist={['*']}
                  source={{
                    uri: item.url,
                  }}
                />
              </Camera>
            ))}
        </CameraContainer>

        <DeviceContainer>
          {devices &&
            devices.map(item => (
              <DeviceItem
                key={item.device}
                onPress={() => {
                  this.handleSwitch(item);
                }}
              >
                <TabText>{item.name}</TabText>
                {item.type === 'mom' ? (
                  <Icon
                    name="power-settings-new"
                    size={35}
                    color="#FFF"
                    style={{ marginLeft: 40 }}
                  />
                ) : (
                  <Icon
                    name="wb-incandescent"
                    size={35}
                    color={item.state ? '#00ff00' : '#FFF'}
                    style={{ marginLeft: 40 }}
                  />
                )}

                <StatusContainer>
                  {item.type === 'ret' ? (
                    <TabText>{item.state ? 'ON' : 'OFF'}</TabText>
                  ) : (
                    <Icon name="restore" size={20} color="#fff" />
                  )}
                  {item.state === true ? (
                    <Icon
                      name="fiber-manual-record"
                      size={15}
                      color="#00ff00"
                    />
                  ) : (
                    <Icon name="fiber-manual-record" size={15} color="#fff" />
                  )}
                </StatusContainer>
              </DeviceItem>
            ))}
        </DeviceContainer>
      </Container>
    </Background>
  );
}

Painel.navigationOptions = {
  tabBarLabel: 'PAINEL',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="computer" size={30} color={tintColor} />
  ),
};
