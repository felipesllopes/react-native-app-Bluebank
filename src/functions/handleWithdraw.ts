import firestore from "@react-native-firebase/firestore";
import { Alert } from "react-native";
import { IUser } from "../interface";

export const handleWithdraw = async (
    user: IUser,
    setUser: (value: IUser) => void,
    val: number,
    setLoading: (value: boolean) => void,
    goBack: () => void,
) => {
    if (val <= 0) {
        return;
    }

    if (val < 20 || val == 30 || val % 10 != 0) {
        Alert.alert(
            "Valor indisponível",
            "Cédulas disponíveis para saque: R$20 e R$50.",
        );
        return;
    }

    if (val > user.balance) {
        Alert.alert(
            "Saldo insuficiente",
            "Você não possui saldo o suficiente para realizar essa operação. Consulte o seu saldo.",
        );
        return;
    }

    if (val > 1000) {
        Alert.alert(
            "Valor não permitido",
            "Valor permitido para saque ultrapassado.",
        );
        return;
    }

    Alert.alert(
        "Confirmar operação?",
        `Deseja confirmar o saque no valor de R$${val.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
        })}?`,
        [
            {
                text: "Cancelar",
                style: "cancel",
            },
            {
                text: "Confirmar",
                onPress: () => confirmOperation(),
            },
        ],
    );

    const confirmOperation = async () => {
        setLoading(true);
        const key = firestore().collection("transactions").doc().id;

        await firestore()
            .collection("transactions")
            .doc(user.uid)
            .collection("transactions")
            .doc(key)
            .set({
                type: "Saque",
                value: val,
                date: new Date().toLocaleString(),
                balance: user.balance - val,
                debit: true,
                participant: user.name,
            })
            .then(async () => {
                await firestore()
                    .collection("users")
                    .doc(user.uid)
                    .update({
                        balance: user.balance - val,
                    })
                    .then(() => {
                        setUser({ ...user, balance: user.balance - val });

                        Alert.alert(
                            "Saque realizado!",
                            `Saque de R$${val.toLocaleString("pt-BR", {
                                minimumFractionDigits: 2,
                            })} realizado com sucesso.`,
                        );
                        goBack();
                    })
                    .catch(() => {
                        alert("Erro ao realizar operação.");
                    });
            })
            .catch(() => {
                alert("Erro ao realizar operação.");
            })
            .finally(() => {
                setLoading(false);
            });
    };
};
