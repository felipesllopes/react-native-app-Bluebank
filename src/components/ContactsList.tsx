import { useNavigation } from "@react-navigation/native";
import React from "react";
import styled from "styled-components/native";
import { IScreenNavigationProps, IUser } from "../interface";

interface IProps {
    user: IUser;
}

export const ContactsList: React.FunctionComponent<IProps> = ({ user }) => {
    const { navigate } = useNavigation<IScreenNavigationProps>();

    return (
        <Container activeOpacity={0.5} onPress={() => navigate("PayPix", user)}>
            <Name>{user.name}</Name>
            <Cpf>
                CPF: ***.{user.cpf.slice(3, 6)}.{user.cpf.slice(6, 9)}-**
            </Cpf>
        </Container>
    );
};

const Container = styled.TouchableOpacity`
    border-bottom-width: 2px;
    margin: 3px;
    padding: 5px 10px;
    border-radius: 2px;
`;

const Name = styled.Text`
    font-size: 16px;
    font-weight: bold;
`;

const Cpf = styled.Text``;
