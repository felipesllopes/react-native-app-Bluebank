import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { Logo_blue } from "../../../components/Logo";
import { PrimaryButton } from "../../../components/SendButton";
import { AuthContext } from "../../../contexts/auth";
import { getBalance } from "../../../functions/getBalance";
import theme from "../../../global/styles/theme";
import { IScreenNavigationPixProps, IUser } from "../../../interface";
import {
    Account,
    Balance,
    Container,
    Cpf,
    Line,
    MarginButton,
    Name,
    Scroll,
    Title,
    Value,
    ValueInput,
    ViewBalance,
    ViewDestinatary,
    ViewPayer,
    ViewTop,
} from "./styles";

export const PayPix: React.FunctionComponent = () => {
    const { user } = useContext(AuthContext);
    const route = useRoute();
    const destinatary = route.params as IUser;
    const [balance, setBalance] = useState<number>(0);
    const [value, setValue] = useState<string>("");
    const { navigate } = useNavigation<IScreenNavigationPixProps>();

    useEffect(() => {
        (async () => {
            await getBalance(user.uid, setBalance);
        })();
    }, []);

    const validation = () => {
        if (
            parseFloat(value) <= 0 ||
            value.length == 0 ||
            parseFloat(value) > balance
        ) {
            return true;
        } else return false;
    };

    return (
        <Container>
            <Scroll showsVerticalScrollIndicator={false}>
                <Title>Confirmar Pix para:</Title>

                <ViewDestinatary>
                    <Name>{destinatary.name.toUpperCase()}</Name>
                    <Cpf>
                        CPF: ***.{destinatary.cpf.slice(3, 6)}.
                        {destinatary.cpf.slice(6, 9)}-**
                    </Cpf>
                </ViewDestinatary>

                <Value>Valor a pagar</Value>

                <ValueInput
                    value={value}
                    onChangeText={setValue}
                    placeholder="R$ 0,00"
                    keyboardType="numeric"
                />

                <ViewPayer style={{ elevation: 5 }}>
                    <ViewTop>
                        <Logo_blue scale={10} />
                        <View style={{ marginLeft: 10 }}>
                            <Account>Conta</Account>
                            <Account>0000 - Cc 000000-0</Account>
                        </View>
                    </ViewTop>
                    <Line />
                    <ViewBalance>
                        <Balance>Saldo</Balance>
                        <Balance>
                            R${" "}
                            {balance.toLocaleString("pt-BR", {
                                minimumFractionDigits: 2,
                            })}
                        </Balance>
                    </ViewBalance>
                </ViewPayer>
            </Scroll>

            <MarginButton>
                <PrimaryButton
                    onPress={() =>
                        navigate("ConfirmPix", { value, destinatary })
                    }
                    title="CONTINUAR"
                    style={{
                        backgroundColor: validation()
                            ? theme.colors.gray
                            : theme.colors.primary,
                        borderWidth: validation() ? 0 : 1,
                        elevation: 3,
                    }}
                    disabled={validation() ? true : false}
                />
            </MarginButton>
        </Container>
    );
};
