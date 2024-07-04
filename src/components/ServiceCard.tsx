import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ImageSourcePropType } from "react-native";
import styled from "styled-components/native";
import theme from "../global/styles/theme";
import { IScreenNavigation } from "../interface";

interface IProps {
    screen: string;
    source: ImageSourcePropType;
    nameCard: string;
}

export const ServiceCard: React.FunctionComponent<IProps> = ({
    screen,
    source,
    nameCard,
}) => {
    const { navigate } = useNavigation<IScreenNavigation>();

    return (
        <CardButtons onPress={() => navigate(screen)} activeOpacity={0.8}>
            <ViewIcon style={{ elevation: 4 }}>
                <IconCard source={source} resizeMode="contain" />
            </ViewIcon>
            <NameCard>{nameCard}</NameCard>
        </CardButtons>
    );
};

const CardButtons = styled.TouchableOpacity`
    width: 25%;
    align-items: center;
`;

const ViewIcon = styled.View`
    background-color: ${theme.colors.white};
    padding: 10px;
    border-radius: 30px;
`;

const IconCard = styled.Image`
    height: 30px;
    width: 30px;
`;

const NameCard = styled.Text`
    text-align: center;
    margin-top: 6px;
    color: ${theme.colors.white};
    font-size: 13px;
`;
