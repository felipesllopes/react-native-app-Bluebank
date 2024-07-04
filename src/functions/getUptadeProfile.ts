import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { IFormEditProfile, IUser } from "../interface";
import * as Keychain from "react-native-keychain";

export const getUpdateProfile = async (
    data: IFormEditProfile,
    user: IUser,
    setUser: (value: React.SetStateAction<IUser>) => void,
    isChecked: boolean,
    setShow: (value: boolean) => void,
    password: string,
) => {
    await auth()
        .currentUser.updateEmail(data.email)
        .then(async () => {
            await firestore().collection("users").doc(user.uid).update({
                name: data.name,
                email: data.email,
                cpf: data.cpf,
            });
        })
        .then(async () => {
            setUser({
                ...user,
                name: data.name,
                email: data.email,
                cpf: data.cpf,
            });

            await Keychain.getGenericPassword().then(async val => {
                if (val) {
                    await Keychain.setGenericPassword(data.email, password);
                }
            });

            // condicional para salvar preferencias de email no login
            if (isChecked) {
                await AsyncStorage.setItem("@keyEmailUser", data.email);
            }
        })
        .finally(() => {
            setShow(false);
        });
};
