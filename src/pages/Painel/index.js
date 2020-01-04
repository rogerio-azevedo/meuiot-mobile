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
  const [bcolor, setBcolor] = useState('#fff');

  const profile = useSelector(state => state.user.profile);
  const clienteId = profile.customer.id;

  useEffect(() => {
    (async () => {
      const response = await api.get('painel', {
        params: {
          cliente: clienteId,
          typ: swhState.type,
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
    console.tron.log(clicked);

    if (clicked.type === 'mom' && !clicked.state === true) {
      setBcolor('#00ff00');
      setTimeout(() => {
        setBcolor('#fff');
      }, 500);
    }

    const swtc = {
      device: clicked.id,
      type: clicked.type,
      state: clicked.type === 'mom' ? true : !clicked.state,
    };
    setSwtState(swtc);
  };

  handlelogOut = () => {
    dispatch(signOut());
  };

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

        <WelcomeText>Olá, {profile.name}</WelcomeText>
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
                key={item.id}
                onPress={() => {
                  this.handleSwitch(item);
                }}
              >
                <TabText>{item.name}</TabText>

                <Icon
                  name={item.type === 'mom' ? 'restore' : 'wb-incandescent'}
                  size={25}
                  color={
                    item.type === 'mom'
                      ? bcolor
                      : item.state
                      ? '#00ff00'
                      : '#fff'
                  }
                  style={{ marginLeft: 40 }}
                />

                <StatusContainer>
                  {item.type === 'ret' ? (
                    <TabText>{item.state ? 'ON' : 'OFF'}</TabText>
                  ) : (
                    <Icon name="restore" size={20} color="#fff" />
                  )}

                  <Icon
                    name="fiber-manual-record"
                    size={15}
                    color={item.state === true ? '#00ff00' : '#fff'}
                  />
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
