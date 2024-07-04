import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { Alert } from "react-native";
import ReactNativeBiometrics from "react-native-biometrics";
import * as Keychain from "react-native-keychain";
import { ModalPasswordConfirm } from "../../components/ModalPasswordConfirm";
import { AuthContext } from "../../contexts/auth";
import { Button, Container, Img, Text, TextButton, Title } from "./styles";

export const Biometry: React.FunctionComponent = () => {
    const rnBiometrics = new ReactNativeBiometrics();
    const { goBack } = useNavigation();

    const { user } = useContext(AuthContext);
    const [show, setShow] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");

    const getRegisterBiometry = async () => {
        await rnBiometrics
            .simplePrompt({ promptMessage: "Confirmar impressão digital" })
            .then(async resultObject => {
                const { success } = resultObject;
                if (success) {
                    setShow(true);
                } else {
                    Alert.alert(
                        "Solicitação biométrica cancelada pelo usuário",
                    );
                    setShow(false);
                }
            })
            .catch(() => {
                Alert.alert("Falha na autenticação biométrica");
            });
    };

    const handleFunction = async () => {
        await Keychain.setGenericPassword(user.email, password).then(() => {
            Alert.alert("Biometria cadastrada");
            goBack();
        });
    };

    return (
        <Container>
            <Img source={require("../../assets/biometry.png")} />
            <Title>Cadastrar biometria</Title>
            <Text>Use sua digital para um acesso mais rápido e seguro.</Text>

            <Button onPress={getRegisterBiometry} activeOpacity={0.7}>
                <TextButton>Continuar</TextButton>
            </Button>

            <Button
                onPress={() => goBack()}
                activeOpacity={0.7}
                style={{ backgroundColor: "transparent" }}
            >
                <TextButton>Voltar</TextButton>
            </Button>

            <ModalPasswordConfirm
                setShow={setShow}
                show={show}
                setPassword={setPassword}
                handleFunction={handleFunction}
            />
        </Container>
    );
};
