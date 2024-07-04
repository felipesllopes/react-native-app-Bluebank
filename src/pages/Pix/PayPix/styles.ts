import styled from "styled-components/native";
import theme from "../../../global/styles/theme";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${theme.colors.background};
`;

export const Scroll = styled.ScrollView`
    flex: 1;
    width: 100%;
    padding: 10px;
`;

export const Title = styled.Text`
    font-size: 17px;
    margin-top: 10px;
`;

export const ViewDestinatary = styled.View`
    margin: 16px 0;
`;

export const Name = styled.Text`
    font-size: 17px;
    font-weight: bold;
`;

export const Cpf = styled.Text`
    font-size: 15px;
`;

export const Value = styled.Text`
    font-size: 15px;
`;

export const ValueInput = styled.TextInput`
    font-size: 18px;
    font-weight: bold;
    border-bottom-width: 2px;
    padding: 0 0 5px 5px;
`;

export const ViewPayer = styled.View`
    border-width: 1.5px;
    padding: 10px 20px;
    margin: 30px;
    background-color: ${theme.colors.white};
    border-radius: 8px;
    align-self: center;
`;

export const ViewTop = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Logo = styled.Image`
    width: 40px;
    height: 40px;
    margin-right: 10px;
`;

export const Account = styled.Text`
    font-size: 15px;
    font-weight: bold;
`;

export const Line = styled.View`
    height: 1.5px;
    background-color: ${theme.colors.black};
    margin: 14px 0;
`;

export const ViewBalance = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const Balance = styled.Text`
    font-size: 16px;
    font-weight: bold;
    margin: 0 3px;
`;

export const MarginButton = styled.View`
    margin: 0 10px 5px;
`;
