import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { IFormEditProfile, IUser } from "../interface";

interface IPassword {
    password: string;
}

export const handleDataChange = async (
    user: IUser,
    value: IPassword,
    setLoading: (value: boolean) => void,
    data: IFormEditProfile,
    setUser: (value: IUser) => void,
    isChecked: boolean,
    setShow: (value: boolean) => void,
) => {
    const currentUser = auth().currentUser;
    const credentials = auth.EmailAuthProvider.credential(
        user.email,
        value.password,
    );

    setLoading(true);

    currentUser
        .reauthenticateWithCredential(credentials)
        .then(() => {
            currentUser.updateEmail(data.email);
        })
        .then(async () => {
            await firestore()
                .collection("users")
                .doc(user.uid)
                .update({
                    name: data.name,
                    email: data.email,
                    cpf: data.cpf,
                })
                .then(async () => {
                    setUser({
                        ...user,
                        name: data.name,
                        email: data.email,
                        cpf: data.cpf,
                    });
                    if (isChecked) {
                        await AsyncStorage.setItem("@keyEmailUser", data.email);
                        setShow(false);
                    }
                })
                .catch(() => {
                    alert("Erro ao atualizar informações.");
                });
        })
        .catch(() => {
            alert("Senha incorreta");
        })
        .finally(() => {
            setLoading(false);
        });
};
