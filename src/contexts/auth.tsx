import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import React, { createContext, useState } from "react";
import { Alert } from "react-native";
import {
    IFormLogin,
    IFormRegister,
    IFormResetPassword,
    IUser,
} from "../interface";
import { removeItem, setEmail, setPreference } from "../storage";

interface IAuthContext {
    user: IUser;
    signed: boolean;
    loading: boolean;
    isChecked: boolean;
    setUser: (value: React.SetStateAction<IUser>) => void;
    setIsChecked: (value: boolean) => void;
    setLoading: (value: boolean) => void;
    signUp(data: IFormRegister): void;
    signIn(data: IFormLogin): void;
    resetPassword(
        data: IFormResetPassword,
        setMessage: (value: string) => void,
    ): void;
    logOut(): void;
}

interface IProps {
    children: React.ReactElement;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FunctionComponent<IProps> = ({ children }) => {
    const [user, setUser] = useState<IUser>({} as IUser);
    const [loading, setLoading] = useState<boolean>(false);
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const initialValue: number = 20;

    /**
     * Function to register the user.
     * @param data
     */
    const signUp = async (data: IFormRegister) => {
        setLoading(true);
        await auth()
            .createUserWithEmailAndPassword(data.email, data.password)
            .then(async value => {
                const uid = value.user.uid;
                await firestore()
                    .collection("users")
                    .doc(uid)
                    .set({
                        name: data.name,
                        cpf: data.cpf,
                        email: data.email,
                        balance: initialValue,
                    })
                    .then(() => {
                        const dados = {
                            name: data.name,
                            cpf: data.cpf,
                            balance: initialValue,
                            email: value.user.email,
                            uid: value.user.uid,
                        };
                        setUser(dados);
                    })
                    .catch(() => {
                        alert("Erro ao obter dados do usuário.");
                    });
            })
            .catch(() => {
                alert("Erro ao cadastrar usuário.");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    /**
     * Function to perform user login.
     * @param data
     */
    const signIn = async (data: IFormLogin) => {
        setLoading(true);
        await auth()
            .signInWithEmailAndPassword(data.email, data.password)
            .then(async value => {
                const uid = value.user.uid;
                await firestore()
                    .collection("users")
                    .doc(uid)
                    .get()
                    .then(async values => {
                        const dados = {
                            name: values.data().name,
                            cpf: values.data().cpf,
                            balance: values.data().balance,
                            email: value.user.email,
                            uid: value.user.uid,
                        };
                        setUser(dados);

                        const valueBooleanString = isChecked ? "true" : "false";

                        await setPreference(valueBooleanString);

                        if (isChecked) {
                            await setEmail(data.email);
                        }
                    })
                    .catch(() => {
                        alert("Erro ao buscar os dados do usuário.");
                    });
            })
            .catch(() => {
                alert("Erro ao fazer login");
            })
            .finally(async () => {
                setLoading(false);
            });
    };

    /**
     * Function to reset password.
     * @param data
     * @param setMessage
     */
    const resetPassword = async (
        data: IFormResetPassword,
        setMessage: (value: string) => void,
    ) => {
        setLoading(true);
        await auth()
            .sendPasswordResetEmail(data.email)
            .then(() => {
                Alert.alert(
                    "E-mail enviado",
                    "Verifique sua caixa de entrada e caixa de spam.",
                );
                setMessage(`E-mail enviado para: \n ${data.email}`);
            })
            .catch(() => {
                alert(
                    "Erro ao tentar recuperar e-mail. Verifique o e-mail cadastrado.",
                );
            })
            .finally(() => {
                setLoading(false);
            });
    };

    /**
     * Function to log out.
     */
    const logOut = async () => {
        Alert.alert("Sair da conta", "Tem certeza que deseja desconectar?", [
            {
                text: "Cancelar",
                style: "cancel",
            },
            {
                text: "Sair",
                onPress: async () => {
                    setLoading(true);
                    await auth()
                        .signOut()
                        .then(async () => {
                            await removeItem(setUser);
                        })
                        .catch(() => {
                            alert("Erro ao sair.");
                        })
                        .finally(() => {
                            setLoading(false);
                        });
                },
            },
        ]);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                signed: !!user.uid,
                loading,
                setLoading,
                setUser,
                signUp,
                signIn,
                logOut,
                resetPassword,
                isChecked,
                setIsChecked,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
