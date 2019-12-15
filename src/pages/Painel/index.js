import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { WebView } from 'react-native-webview';

import logo from '~/assets/logo.png';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';

import {
  Container,
  HeaderContainer,
  AvatarContainer,
  Avatar,
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

export default function Painel() {
  const [devices, setDevices] = useState([]);
  const [swhState, setSwtState] = useState({});

  const profile = useSelector(state => state.user.profile);

  useEffect(() => {
    (async () => {
      const response = await api.get('painel', {
        params: {
          cliente: 1,
          dev: swhState.device,
          ste: swhState.state,
        },
      });

      setDevices(response.data);
    })().catch(err => {
      console.error(err);
    });
  }, [swhState]);

  handleSwitch = clicked => {
    const swtc = {
      device: clicked.device,
      state: !clicked.state,
    };
    setSwtState(swtc);
  };
  console.tron.log(swhState);

  return (
    <Background>
      <Container>
        <HeaderContainer>
          <MenuContainer>
            <Icon name="short-text" size={40} color="#fff"></Icon>
          </MenuContainer>
          <AvatarContainer>
            <Avatar source={logo} />
          </AvatarContainer>
        </HeaderContainer>

        <WelcomeText>Olá, {profile.username}</WelcomeText>
        <TermometerText>Temperatura externa: 36°C</TermometerText>

        <CameraContainer>
          <Camera>
            <WebView
              originWhitelist={['*']}
              source={{
                uri:
                  'http://peantonio.ddns.net:8081/cgi-bin/mjpg/video.cgi?channel=0&subtype=1',
              }}
            />
          </Camera>
          <Camera>
            <WebView
              originWhitelist={['*']}
              source={{
                uri:
                  'http://peantonio.ddns.net:8081/cgi-bin/mjpg/video.cgi?channel=0&subtype=1',
              }}
            />
          </Camera>
          <Camera>
            <WebView
              originWhitelist={['*']}
              source={{
                uri:
                  'http://peantonio.ddns.net:8081/cgi-bin/mjpg/video.cgi?channel=0&subtype=1',
              }}
            />
          </Camera>
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
                <Icon
                  name="power-settings-new"
                  size={35}
                  color="#FFF"
                  style={{ marginLeft: 40 }}
                />
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
                      color="#FFFF00"
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
