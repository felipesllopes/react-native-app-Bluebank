import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import styled from "styled-components/native";
import { AuthContext } from "../contexts/auth";
import { getBalance } from "../functions/getBalance";
import theme from "../global/styles/theme";
import { IScreenNavigation } from "../interface";

export const AccountDashboard: React.FunctionComponent = () => {
    const [visibleBalance, setVisibleBalance] = useState(false);
    const [balance, setBalance] = useState<number>(0);
    const { user } = useContext(AuthContext);
    const { navigate } = useNavigation<IScreenNavigation>();

    const handlevisibleBalance = () => {
        setVisibleBalance(current => !current);
    };

    useEffect(() => {
        (async () => {
            await getBalance(user.uid, setBalance);
        })();
    }, [user.uid]);

    return (
        <LinearGradient
            colors={["#000000", "#142556"]}
            style={{
                borderRadius: 10,
                alignSelf: "center",
                padding: 14,
                width: "80%",
                elevation: 10,
            }}
        >
            <IconVisible
                onPress={handlevisibleBalance}
                name={visibleBalance ? "eye" : "eye-slash"}
            />
            <Name>{user && user.name}</Name>

            <TextAccount>1234 ********-1</TextAccount>

            <TextAccount>
                R$
                {visibleBalance
                    ? balance.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                      })
                    : " **"}
            </TextAccount>

            <Transactions onPress={() => navigate("Transacoes")}>
                Ver transações
            </Transactions>
        </LinearGradient>
    );
};

const Name = styled.Text`
    font-size: 17px;
    color: ${theme.colors.white};
    margin-bottom: 10px;
`;

const TextAccount = styled.Text`
    font-size: 19px;
    color: ${theme.colors.white};
    font-weight: 500;
    margin-bottom: 6px;
`;

const IconVisible = styled(FontAwesome)`
    font-size: 24px;
    color: gray;
    position: absolute;
    align-self: flex-end;
    top: 6px;
    right: 12px;
    z-index: 2;
`;

const Transactions = styled.Text`
    text-align: right;
    color: ${theme.colors.white};
    text-decoration: underline;
`;
