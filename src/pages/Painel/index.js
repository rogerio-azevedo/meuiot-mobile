import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '~/store/modules/auth/actions';
import { Alert } from 'react-native';

import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';

import Carousel from 'react-native-snap-carousel';
import { Dimensions } from 'react-native';
const { width: screenWidth } = Dimensions.get('window');

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
} from './styles';
import api from '~/services/api';

export default function Painel({ navigation }) {
  const dispatch = useDispatch();
  const [devices, setDevices] = useState([]);
  const [swhState, setSwtState] = useState({});
  const [bcolor, setBcolor] = useState({ color: '#aaa' });
  const [entries, setEntries] = useState([]);

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

      const links = response.data.channels.map(item => ({
        title: item.url,
      }));

      setDevices(response.data.devices);
      setEntries(links);
    })().catch(err => {
      console.error(err);
    });
  }, [swhState]);

  handleSwitch = clicked => {
    if (clicked.type === 'mom' && !clicked.state === true) {
      setBcolor({ id: clicked.id, color: '#159957' });
      setTimeout(() => {
        setBcolor({ id: clicked.id, color: '#aaa' });
      }, 600);
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

  _renderItem = ({ item }) => {
    return (
      <CameraContainer>
        <WebView
          scalesPageToFit
          scrollEnabled={false}
          automaticallyAdjustContentInsets
          startInLoadingState={false}
          originWhitelist={['*']}
          source={{ uri: item.title }}
        />
      </CameraContainer>
    );
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
        <TermometerText>Temperatura externa: 35°C</TermometerText>

        <Carousel
          ref={c => {
            _carousel = c;
          }}
          data={entries}
          renderItem={_renderItem}
          sliderWidth={screenWidth}
          itemWidth={screenWidth}
        />

        <DeviceContainer>
          {devices &&
            devices.map(item => (
              <DeviceItem
                key={item.id}
                onPress={() => {
                  this.handleSwitch(item);
                }}
              >
                <StatusContainer>
                  <Icon
                    name="fiber-manual-record"
                    size={18}
                    color={
                      item.type === 'mom' && item.id === bcolor.id
                        ? bcolor.color
                        : item.state
                        ? '#159957'
                        : '#aaa'
                    }
                  />
                </StatusContainer>
                <Icon
                  name={item.type === 'mom' ? 'restore' : 'wb-incandescent'}
                  size={50}
                  color={'#155799'}
                  style={{ marginTop: 15 }}
                />
                <TabText>{item.name}</TabText>
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
