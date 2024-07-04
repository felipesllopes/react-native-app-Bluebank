import { useNavigation } from "@react-navigation/native";
import React from "react";
import styled from "styled-components/native";
import theme from "../global/styles/theme";
import { ITransactions } from "../interface";
import { View } from "react-native";

interface IProps {
    data: ITransactions;
}

interface IScreenNavigationProps {
    navigate: (screen: string, params?: ITransactions) => void;
}

export const TransactionsList: React.FunctionComponent<IProps> = ({ data }) => {
    const { navigate } = useNavigation<IScreenNavigationProps>();

    return (
        <Container
            activeOpacity={0.7}
            onPress={() => navigate("TransactionsDetails", data)}
        >
            <View>
                <BoxType>
                    <Type>{data.type}</Type>

                    <Balance>
                        R$
                        {data.balance.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                        })}
                    </Balance>
                </BoxType>
                <Value
                    style={{
                        color: data.debit ? "#e70000" : "#009900",
                    }}
                >
                    R$
                    {data.value.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                    })}
                </Value>
            </View>
        </Container>
    );
};

const Container = styled.TouchableOpacity`
    flex: 1;
    margin: 10px 10px 0;
    padding: 5px;
    border-top-width: 1px;
`;

const BoxType = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

const Type = styled.Text`
    font-weight: 500;
    font-size: 16px;
`;

const Value = styled.Text``;

const Balance = styled.Text`
    font-size: 16px;
    font-weight: 600;
    color: #333;
`;
