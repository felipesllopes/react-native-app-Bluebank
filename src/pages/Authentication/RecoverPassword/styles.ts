import styled from "styled-components/native";
import theme from "../../../global/styles/theme";

export const Text = styled.Text`
    font-size: 17px;
    margin: 30px 10px;
    text-align: center;
`;

export const Message = styled.Text`
    font-size: 17px;
    text-align: center;
    font-style: italic;
    margin: 5px 10px 20px;
    color: ${theme.colors.text};
    background-color: ${theme.colors.background};
    padding: 20px 10px;
    border-radius: 10px;
    align-self: center;
    border-width: 1px;
`;
