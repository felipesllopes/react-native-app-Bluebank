import firestore from "@react-native-firebase/firestore";
import { Alert } from "react-native";
import { IUser } from "../interface";

export const handleDeposit = async (
    user: IUser,
    setUser: (value: IUser) => void,
    val: number,
    setLoading: (value: boolean) => void,
    goBack: () => void,
) => {
    if (val <= 0) {
        return;
    }

    if (val > 3000) {
        Alert.alert(
            "Valor não permitido",
            "Valor permitido para depósito ultrapassado.",
        );
        return;
    }

    Alert.alert(
        "Confirmar operação?",
        `Deseja confirmar o depósito no valor de R$${val.toLocaleString(
            "pt-BR",
            { minimumFractionDigits: 2 },
        )}?`,
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
                type: "Depósito",
                value: val,
                date: new Date().toLocaleString(),
                balance: user.balance + val,
                debit: false,
                participant: user.name,
            })
            .then(async () => {
                await firestore()
                    .collection("users")
                    .doc(user.uid)
                    .update({
                        balance: user.balance + val,
                    })
                    .then(() => {
                        setUser({ ...user, balance: user.balance + val });

                        Alert.alert(
                            "Depósito realizado!",
                            `Depósito de R$${val.toLocaleString("pt-BR", {
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
