import styled from "styled-components/native";
import theme from "../../global/styles/theme";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${theme.colors.secondary};
`;

export const Background = styled.ImageBackground`
    flex: 1;
    width: 100%;
`;

export const Scroll = styled.ScrollView`
    flex: 1;
    width: 100%;
    background-color: rgba(102, 163, 255, 0.85);
`;

export const Body = styled.View`
    padding: 10px;
`;
