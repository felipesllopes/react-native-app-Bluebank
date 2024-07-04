import Ionicons from "@expo/vector-icons/Ionicons";
import styled from "styled-components/native";
import theme from "../../../global/styles/theme";

export const Container = styled.SafeAreaView`
    flex: 1;
`;

export const Scroll = styled.ScrollView`
    flex: 1;
    padding: 10px;
    width: 100%;
`;

export const ViewAlert = styled.View`
    align-items: center;
    flex-direction: row;
    justify-content: center;
    border-width: 1px;
    margin: 10px 0;
    padding: 4px;
    border-radius: 5px;
`;

export const IconCheck = styled(Ionicons)`
    margin: 0 10px;
`;

export const Value = styled.Text`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
`;

export const Data = styled.Text`
    font-size: 16px;
    margin-bottom: 20px;
`;

export const Line = styled.View`
    width: 100%;
    height: 1px;
    background-color: ${theme.colors.black};
    margin: 10px 0;
`;
