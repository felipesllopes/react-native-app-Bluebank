import styled from "styled-components/native";
import theme from "../../../global/styles/theme";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${theme.colors.background};
`;

export const Wallpaper = styled.ImageBackground`
    flex: 1;
    width: 100%;
`;

export const ViewOpacity = styled.View`
    background-color: rgba(240, 245, 255, 0.85);
    flex: 1;
`;

export const ViewLogo = styled.View`
    align-items: center;
    padding: 10px 0;
    background-color: ${theme.colors.primary};
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    margin-bottom: 30px;
`;

export const Scroll = styled.ScrollView`
    width: 100%;
    padding: 0 20px;
`;

export const ButtonBiometry = styled.TouchableOpacity`
    align-self: center;
    width: 40%;
    border-radius: 10px;
`;

export const TextBiometry = styled.Text`
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    color: ${theme.colors.primary};
`;

export const IconBiometry = styled.Image`
    width: 55px;
    height: 55px;
`;

export const Text = styled.Text`
    font-size: 15px;
    font-weight: 700;
    text-align: center;
    margin: 60px 0;
`;

export const ViewCheckBox = styled.View`
    flex-direction: row;
    align-items: center;
    align-self: flex-end;
    margin: 10px 0 24px;
`;

export const TextCheck = styled.Text`
    margin-right: 5px;
    font-size: 13px;
`;

export const TextRecoverPassword = styled.Text`
    text-align: center;
    margin: 15px 10px 20px;
    text-decoration: underline;
    font-weight: 500;
    font-size: 13px;
`;
