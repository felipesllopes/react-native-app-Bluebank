import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { AccountDashboard } from "../../components/AccountDashboard";
import { BiometricsRegistrationService } from "../../components/BiometricsRegistrationService";
import { CarouselSliders } from "../../components/CarouselSLiders";
import { HeaderDrawer } from "../../components/HeaderDrawer";
import { Margin } from "../../components/Margin";
import { OtherServicesList } from "../../components/OtherServicesList";
import { ServiceCardList } from "../../components/ServiceCardList";
import { AuthContext } from "../../contexts/auth";
import { getHaveBiometrics } from "../../functions/getHaveBiometrics";
import { getSuportedBiometry } from "../../functions/getSuportedBiometry";
import { handleSliders } from "../../functions/handleSliders";
import { ISliders } from "../../interface";
import { Background, Body, Container, Scroll } from "./styles";

export const Home: React.FunctionComponent = () => {
    const { user } = useContext(AuthContext);
    const [isBiometry, setIsBiometry] = useState<boolean>(false);
    const [sliders, setSliders] = useState<ISliders[]>([]);
    const [suportedBiometry, setSuportedBiometry] = useState<boolean>();

    useEffect(() => {
        (async () => {
            await getHaveBiometrics(setIsBiometry);
        })();
    }, [getHaveBiometrics, user, setIsBiometry]);

    useEffect(() => {
        (async () => {
            await getSuportedBiometry(setSuportedBiometry);
        })();
    }, [setSuportedBiometry]);

    useEffect(() => {
        (async () => {
            await handleSliders(setSliders);
        })();
    }, [setSliders]);

    return (
        <Container>
            <HeaderDrawer />

            <Background
                source={require("../../assets/Background/background.jpg")}
            >
                <Scroll>
                    <Margin pixels={24} />

                    <AccountDashboard />

                    <Margin pixels={40} />

                    <Body>
                        <ServiceCardList />

                        <Margin pixels={50} />

                        {!suportedBiometry ||
                            (!isBiometry && (
                                <View>
                                    <BiometricsRegistrationService />
                                    <Margin pixels={50} />
                                </View>
                            ))}

                        {sliders && (
                            <View>
                                <CarouselSliders sliders={sliders} />
                                <Margin pixels={20} />
                            </View>
                        )}

                        <OtherServicesList />
                    </Body>
                </Scroll>
            </Background>
        </Container>
    );
};
