import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacityProps } from "react-native";
import styled from "styled-components/native";
import theme from "../global/styles/theme";
import { IScreenNavigation } from "../interface";

interface IPropsPrimaryButton extends TouchableOpacityProps {
    title: string;
    onPress: () => void;
}

export const PrimaryButton: React.FunctionComponent<IPropsPrimaryButton> = ({
    title,
    onPress,
    ...otherProps
}) => {
    return (
        <Button
            onPress={onPress}
            activeOpacity={0.7}
            {...otherProps}
            style={{ elevation: 4, padding: 9.5 }}
        >
            <TextButton>{title}</TextButton>
        </Button>
    );
};

interface IPropsSecondaryButton extends TouchableOpacityProps {
    title: string;
    screen: string;
}

export const SecondaryButton: React.FunctionComponent<
    IPropsSecondaryButton
> = ({ title, screen, ...otherProps }) => {
    const { navigate } = useNavigation<IScreenNavigation>();

    return (
        <Button
            onPress={() => navigate(screen)}
            activeOpacity={0.7}
            style={{
                elevation: 4,
                backgroundColor: theme.colors.background,
                borderWidth: 1,
                borderColor: theme.colors.primary,
                padding: 8,
            }}
            {...otherProps}
        >
            <TextButton style={{ color: theme.colors.primary }}>
                {title}
            </TextButton>
        </Button>
    );
};

const Button = styled.TouchableOpacity`
    background-color: ${theme.colors.primary};
    border-radius: 10px;
    margin: 5px 0;
`;

const TextButton = styled.Text`
    font-weight: 600;
    color: ${theme.colors.white};
    text-align: center;
`;
