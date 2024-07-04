import { useNavigation } from "@react-navigation/native";
import React from "react";
import styled from "styled-components/native";
import theme from "../global/styles/theme";
import { IScreenNavigation } from "../interface";

interface IProps {
    title: string;
    description: string;
    screen: string;
}

export const OtherServices: React.FunctionComponent<IProps> = ({
    title,
    description,
    screen,
}) => {
    const { navigate } = useNavigation<IScreenNavigation>();

    return (
        <CardButton
            style={{ elevation: 5 }}
            activeOpacity={0.8}
            onPress={() => navigate(screen)}
        >
            <Title>{title}</Title>
            <Description>{description}</Description>
        </CardButton>
    );
};

const CardButton = styled.TouchableOpacity`
    background-color: ${theme.colors.white};
    border-radius: 10px;
    padding: 6px 10px;
    margin-bottom: 10px;
`;

const Title = styled.Text`
    font-size: 16px;
    font-weight: bold;
    margin-right: 6px;
`;

const Description = styled.Text``;
