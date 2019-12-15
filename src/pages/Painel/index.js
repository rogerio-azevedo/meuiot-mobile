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
  SwitchContainer,
  SwitchItem,
  StatusContainer,
  TabText,
  CameraContainer,
  Camera,
  ButtonsContainer,
  ActionButton,
} from './styles';
import api from '~/services/api';

export default function Painel() {
  const [devices, setDevices] = useState([]);
  const [switches, setSwitches] = useState([]);

  const [swhState, setSwtState] = useState({});

  const profile = useSelector(state => state.user.profile);

  useEffect(() => {
    async function loadPainel() {
      const response = await api.get('painel', {
        params: {
          cliente: 1,
        },
      });

      setDevices(response.data.devices);
      setSwitches(response.data.switches);
    }
    loadPainel();
  }, []); // eslint-disable-line

  handleSwitch = clicked => {
    const swtc = {
      id: clicked.name,
      name: clicked.name,
      state: !clicked.state,
      type: clicked.type,
    };
    setSwtState(swtc);
  };
  // console.tron.log(swhState);

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
              <DeviceItem key={item.id}>
                <TabText>{item.name}</TabText>
                <Icon
                  name="power-settings-new"
                  size={45}
                  color="#FFF"
                  style={{ marginLeft: 60 }}
                />
                <StatusContainer>
                  <TabText>{item.model}</TabText>
                </StatusContainer>
              </DeviceItem>
            ))}
        </DeviceContainer>

        <SwitchContainer>
          {switches &&
            switches.map(item => (
              <SwitchItem
                key={item.id}
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
                  <Icon name="fiber-manual-record" size={15} color="#FFFF00" />
                </StatusContainer>
              </SwitchItem>
            ))}
        </SwitchContainer>
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
