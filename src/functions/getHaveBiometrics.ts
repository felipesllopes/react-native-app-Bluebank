import * as Keychain from "react-native-keychain";

export const getHaveBiometrics = async (
    setIsBiometry: React.Dispatch<React.SetStateAction<boolean>>,
) => {
    await Keychain.getGenericPassword()
        .then(val => {
            setIsBiometry(true);
        })
        .catch(() => {
            setIsBiometry(false);
        });
};
