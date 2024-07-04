import Ionicons from "@expo/vector-icons/Ionicons";
import { FlatList, FlatListProps } from "react-native";
import styled from "styled-components/native";
import theme from "../../global/styles/theme";
import { ITransactions } from "../../interface";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${theme.colors.secondary};
`;

export const HeaderTab = styled.View`
    background-color: ${theme.colors.primary};
    padding: 14px 18px;
    flex-direction: row;
`;

export const IconTab = styled(Ionicons)`
    color: ${theme.colors.white};
    font-size: 25px;
`;

export const TitleTab = styled.Text`
    font-size: 18px;
    font-weight: 500;
    color: ${theme.colors.white};
`;

export const Box = styled.View`
    align-items: center;
    margin: 26px;
    margin-bottom: 80px;
`;

export const TextBalance = styled.Text`
    font-size: 15px;
    font-weight: 500;
`;

export const TextValue = styled.Text`
    font-size: 21px;
    color: white;
    text-align: center;
    font-weight: 700;
`;

export const Body = styled.View`
    background-color: ${theme.colors.background};
    flex: 1;
`;

export const ContainerList = styled.View`
    margin: 0 30px 30px;
    align-self: center;
    flex: 1;
    width: 90%;
    border-radius: 10px;
    background-color: ${theme.colors.white};
    top: -50px;
`;

export const TextDate = styled.Text`
    font-weight: 500;
    text-align: right;
    margin: 10px;
    color: ${theme.colors.text};
`;

export const LoadingList = styled.ActivityIndicator`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const FlatListTransactions = styled(
    FlatList as new (
        props: FlatListProps<ITransactions>,
    ) => FlatList<ITransactions>,
)``;

export const NotFound = styled.Text`
    font-size: 15px;
    font-style: italic;
    color: ${theme.colors.text};
    text-align: center;
    margin-top: 20%;
`;
