import Ionicon from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import { Control, Controller } from "react-hook-form";
import { TextInputProps } from "react-native";
import styled from "styled-components/native";
import theme from "../global/styles/theme";

interface IPropsInputControl extends TextInputProps {
    control: Control;
    name: string;
    errors: string | undefined;
    iconName: keyof typeof Ionicon.glyphMap;
}

interface IPropsInputPasswordControl extends TextInputProps {
    control: Control;
    name: string;
    errors: string | undefined;
}

export const InputControl: React.FunctionComponent<IPropsInputControl> = ({
    iconName,
    control,
    name,
    errors,
    ...otherProps
}) => {
    return (
        <Container>
            <ViewInput>
                <IconType name={iconName} />
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { onChange, value } }) => (
                        <Input
                            value={value}
                            onChangeText={onChange}
                            {...otherProps}
                        />
                    )}
                />
            </ViewInput>
            {errors && <TextError>{errors}</TextError>}
        </Container>
    );
};

export const InputPasswordControl: React.FunctionComponent<
    IPropsInputPasswordControl
> = ({ control, name, errors, ...otherProps }) => {
    const [textSecure, setTextSecure] = useState<boolean>(true);

    const handleSecure = () => {
        setTextSecure(current => (current === true ? false : true));
    };

    return (
        <Container>
            <ViewInput>
                <IconType name="lock-closed" />
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { onChange, value } }) => (
                        <Input
                            value={value}
                            onChangeText={onChange}
                            {...otherProps}
                            secureTextEntry={textSecure}
                        />
                    )}
                />
                <IconEye
                    name={textSecure ? "eye-off" : "eye"}
                    onPress={handleSecure}
                />
            </ViewInput>
            {errors && <TextError>{errors}</TextError>}
        </Container>
    );
};

const Container = styled.View`
    margin-bottom: 5px;
`;

const ViewInput = styled.View`
    flex-direction: row;
    align-items: center;
    border-bottom-width: 2px;
    padding: 2px;
    margin-bottom: 22px;
    border-color: ${theme.colors.text};
    border-color: ${theme.colors.primary};
`;

const IconType = styled(Ionicon)`
    font-size: 24px;
    color: ${theme.colors.primary};
`;

const Input = styled.TextInput`
    font-size: 18px;
    margin: 0 10px;
    flex: 1;
`;

const IconEye = styled(Ionicon)`
    font-size: 24px;
    color: ${theme.colors.text};
`;

const TextError = styled.Text`
    position: absolute;
    margin-left: 10px;
    bottom: 0;
    color: ${theme.colors.primary};
`;
