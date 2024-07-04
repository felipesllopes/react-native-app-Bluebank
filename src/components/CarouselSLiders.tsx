import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { Dimensions, View } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import styled from "styled-components/native";
import { IScreenNavigation, ISliders } from "../interface";

interface IProps {
    sliders: ISliders[];
}

export const CarouselSliders: React.FunctionComponent<IProps> = ({
    sliders,
}) => {
    const [activeSlide, setActiveSlide] = useState(0);
    const sliderWidth = Dimensions.get("window").width;
    const itemWidth = sliderWidth * 0.97;
    const sliderRef = useRef<Carousel<ISliders>>(null);
    const { navigate } = useNavigation<IScreenNavigation>();

    const renderItem = ({ item }: { item: ISliders }) => {
        const dpi = Math.round(Dimensions.get("window").scale);
        let imageUrl = item.mdpi;

        if (dpi >= 1 && dpi < 2) {
            imageUrl = item.mdpi;
        } else if (dpi >= 2 && dpi < 3) {
            imageUrl = item.hdpi;
        } else if (dpi >= 3 && dpi < 4) {
            imageUrl = item.xhdpi;
        } else if (dpi >= 4) {
            imageUrl = item.xxhdpi;
        } else {
            imageUrl = item.xxxhdpi;
        }

        return (
            <Container activeOpacity={0.8} onPress={() => navigate(item.title)}>
                <Banner source={{ uri: imageUrl }} resizeMode="contain" />
            </Container>
        );
    };

    return (
        <View style={{ flex: 1, alignItems: "center" }}>
            <Carousel
                ref={sliderRef}
                data={sliders}
                itemWidth={itemWidth}
                sliderWidth={sliderWidth}
                renderItem={renderItem}
                onSnapToItem={index => setActiveSlide(index)}
                autoplay={true}
                autoplayDelay={4000}
                autoplayInterval={4000}
                loop
                activeAnimationType="decay"
            />
            <Pagination
                dotsLength={sliders.length}
                activeDotIndex={activeSlide}
                containerStyle={{ marginTop: -14, marginBottom: 4 }}
                dotStyle={{
                    width: 16,
                    height: 6,
                    borderRadius: 20,
                    backgroundColor: "rgba(255, 255, 255, 0.92)",
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        </View>
    );
};

export const Container = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
`;

export const Banner = styled.Image`
    width: 100%;
    aspect-ratio: 3.95;
    border-radius: 10px;
`;
