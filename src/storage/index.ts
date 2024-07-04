import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser } from "../interface";

/**
 * Função para buscar dados de login
 * @param setIsChecked
 * @param setUser
 * @param setIsDataLoaded
 */
export const getItem = async (
    setIsChecked: (value: boolean) => void,
    setUser: (value: React.SetStateAction<IUser>) => void,
    setIsDataLoaded: (value: boolean) => void,
) => {
    await AsyncStorage.getItem("@keyBoolean")
        .then(async value => {
            if (value === "false") {
                setIsChecked(false);
                return;
            }
            if (value === "true") {
                setIsChecked(true);
                await AsyncStorage.getItem("@keyEmailUser").then(
                    async value => {
                        setUser(current => ({
                            ...current,
                            email: value,
                        }));
                    },
                );
            }
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            setIsDataLoaded(true);
        });
};

/**
 * Função para verificar preferência do usuário
 * @param valueBooleanString
 */
export const setPreference = async (valueBooleanString: "false" | "true") => {
    await AsyncStorage.setItem("@keyBoolean", valueBooleanString);
};

/**
 * Função para salvar email do usuário
 * @param email
 */
export const setEmail = async (email: string) => {
    await AsyncStorage.setItem("@keyEmailUser", email);
};

/**
 * Função para remover preferência e email do usuário
 * @param setUser
 * @param setIsChecked
 */
export const removeItem = async (setUser: (value: IUser) => void) => {
    setUser({} as IUser);
};
