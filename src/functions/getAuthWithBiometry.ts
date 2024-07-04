import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { Alert } from "react-native";
import ReactNativeBiometrics from "react-native-biometrics";
import * as Keychain from "react-native-keychain";
import { IUser } from "../interface";

export const getAuthWithBiometry = async (
    setUser: (value: React.SetStateAction<IUser>) => void,
    setLoading: (value: boolean) => void,
) => {
    const rnBiometrics = new ReactNativeBiometrics();

    await rnBiometrics
        .simplePrompt({ promptMessage: "     Confirmar impressão digital" })
        .then(async resultObject => {
            const { success } = resultObject;
            if (success) {
                setLoading(true);
                await Keychain.getGenericPassword()
                    .then(async data => {
                        await auth()
                            .signInWithEmailAndPassword(
                                data && data.username,
                                data && data.password,
                            )
                            .then(async value => {
                                const uid = value.user.uid;

                                await firestore()
                                    .collection("users")
                                    .doc(uid)
                                    .get()
                                    .then(async user => {
                                        const dados = {
                                            name: user.data().name,
                                            cpf: user.data().cpf,
                                            balance: user.data().balance,
                                            email: value.user.email,
                                            uid: value.user.uid,
                                        };
                                        setUser(dados);
                                    });
                            })
                            .catch(() => {
                                alert("Erro ao fazer login");
                            });
                    })
                    .catch(() => {
                        alert("Erro ao tentar entrar com biometria");
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            }
        })
        .catch(() => {
            Alert.alert("Falha na autenticação biométrica");
        });
};
