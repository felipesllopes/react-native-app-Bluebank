import Ionicons from "@expo/vector-icons/Ionicons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import styled from "styled-components/native";
import { AuthContext } from "../contexts/auth";
import theme from "../global/styles/theme";
import { Logo_white } from "./Logo";

export const HeaderDrawer: React.FunctionComponent = () => {
    const { dispatch } = useNavigation();
    const { logOut } = useContext(AuthContext);

    return (
        <ContainerDrawer style={{ elevation: 10 }}>
            <Logo_white scale={11} />
            <ContainerIcons>
                <Icon
                    style={{ marginRight: 14 }}
                    name="log-out-outline"
                    onPress={logOut}
                />
                <Icon
                    name="menu-sharp"
                    onPress={() => dispatch(DrawerActions.toggleDrawer())}
                />
            </ContainerIcons>
        </ContainerDrawer>
    );
};

interface IProps {
    title: string;
}

export const HeaderDrawer_2: React.FunctionComponent<IProps> = ({ title }) => {
    return (
        <ContainerDrawer
            style={{ justifyContent: "flex-start", elevation: 10 }}
        >
            <Logo_white scale={11} />
            <Title>{title}</Title>
        </ContainerDrawer>
    );
};

const ContainerDrawer = styled.View`
    background-color: ${theme.colors.primary};
    padding: 13px 20px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const ContainerIcons = styled.View`
    flex-direction: row;
    align-items: center;
`;

const Icon = styled(Ionicons)`
    font-size: 26px;
    color: ${theme.colors.white};
`;

const Title = styled.Text`
    font-size: 20px;
    color: ${theme.colors.white};
    font-weight: bold;
    margin-left: 30px;
`;
