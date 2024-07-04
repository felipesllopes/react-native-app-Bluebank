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
    border-width: 1px;
    margin: 10px 0;
    padding: 10px;
    align-items: center;
`;

export const IconAlert = styled(Ionicons)`
    background-color: ${theme.colors.primary};
    align-items: center;
    align-self: center;
    border-radius: 50px;
    margin: 2px;
`;

export const TextConfirm = styled.Text`
    font-size: 16px;
    margin: 20px 0;
`;

export const Text = styled.Text`
    color: ${theme.colors.text};
`;

export const Value = styled.TextInput`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
`;

export const Line = styled.View`
    width: 100%;
    height: 1px;
    background-color: ${theme.colors.black};
    margin: 10px 0;
`;

export const Data = styled.Text`
    font-size: 16px;
    margin-bottom: 20px;
`;
