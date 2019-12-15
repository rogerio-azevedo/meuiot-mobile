import styled from 'styled-components/native';
import { Image } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView``;

export const HeaderContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const AvatarContainer = styled.View`
  background: rgba(255, 255, 255, 0.5);
  border-radius: 70px;
  padding: 3px;
  margin-top: 20px;
  margin-right: 30px;
`;

export const Avatar = styled(Image)`
  width: 48px;
  height: 48px;
`;

export const MenuContainer = styled.View`
  margin-top: 20px;
  margin-left: 30px;
`;

export const WelcomeText = styled.Text`
  margin-top: 20px;
  margin-left: 30px;
  font-size: 22px;
  color: #fff;
  font-weight: 700;
`;

export const TermometerText = styled.Text`
  margin-left: 30px;
  font-size: 14px;
  color: #ccc;
  font-weight: 500;
`;

export const DeviceContainer = styled.ScrollView.attrs({
  horizontal: true,
  contentContainerStyle: { paddingLeft: 10, paddingRight: 20 },
  showsHorizontalScrollIndicator: false,
})`
  margin-top: 20px;
`;

export const DeviceItem = styled.TouchableOpacity`
  width: 140px;
  height: 100px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  margin-left: 10px;
  padding: 10px;
  justify-content: space-between;
`;

export const StatusContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const TabText = styled.Text`
  font-size: 13px;
  color: #fff;
`;

export const CameraContainer = styled.ScrollView.attrs({
  horizontal: true,
  contentContainerStyle: { paddingLeft: 10, paddingRight: 20 },
  showsHorizontalScrollIndicator: false,
})`
  margin-top: 40px;
`;

export const Camera = styled.View`
  width: 370px;
  height: 258;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  margin-left: 10px;
  padding: 10px;
  justify-content: space-between;
`;
