import * as React from 'react';
import {
    Animated,
    Image,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    StatusBar,
    SafeAreaView,
    TouchableNativeFeedback
} from 'react-native';
const { width, height } = Dimensions.get('screen');
import { faker, he } from '@faker-js/faker';



const IMAGE_WIDTH = width * 0.65;
const IMAGE_HEIGHT = IMAGE_WIDTH * 0.7;

const images = [
    'https://images.pexels.com/photos/3429782/pexels-photo-3429782.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/2915099/pexels-photo-2915099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/4514774/pexels-photo-4514774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/7332908/pexels-photo-7332908.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/4066828/pexels-photo-4066828.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/14769816/pexels-photo-14769816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/1191710/pexels-photo-1191710.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/6664375/pexels-photo-6664375.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/2885578/pexels-photo-2885578.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'

];

faker.seed(8);
const DATA = [...Array(images.length).keys()].map((_, i) => {
    return {
        key: faker.string.uuid(),
        image: images[i],
        title: faker.commerce.productName(),
        subtitle: faker.company.buzzPhrase(),
        price: faker.finance.amount(80, 200, 0),
    }
});

const SPACING = 20;
//console.log(DATA);

const Content = ({ item }) => {
    return (
        <>
            <Text style={{ fontSize: 12 }}>{item.title}</Text>
            <Text style={{ fontSize: 12 }}>{item.subtitle}</Text>
            <View style={{ flexDirection: 'row', marginTop: SPACING }}>
                <Text style={{
                    fontSize: 42,
                    letterSpacing: 3,
                    fontWeight: '900',
                    marginRight: 8,
                }}>{item.price}</Text>
                <Text style={{
                    fontSize: 16,
                    lineHeight: 36,
                    fontWeight: '800',
                    alignSelf: 'flex-end',
                }}>USD</Text>
            </View>
        </>

    )
}

const App = () => {
    const scrollX = React.useRef(new Animated.Value(0)).current;
    const progress = Animated.modulo(Animated.divide(scrollX, width), width);
    const [index, setIndex] = React.useState(0);
    const ref = React.useRef();

   //console.log(ref.current);

    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <SafeAreaView style={{ marginTop: SPACING * 4 }}>
                <View style={{ height: IMAGE_HEIGHT * 2.1, justifyContent: 'center', alignItems: 'center' }}>
                    <Animated.FlatList
                         ref={ref}

                        data={DATA}
                        keyExtractor={(item) => item.key}
                        horizontal
                        pagingEnabled

                        style={{ flexGrow: 0 }}
                        scrollEventThrottle={9}
                        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }],
                            { useNativeDriver: true }
                        )}
                        bounces={false}
                        onMomentumScrollEnd={(ev) => {
                            setIndex(Math.floor(ev.nativeEvent.contentOffset.x / width));
                        }}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => {
                            const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
                            const opacity = scrollX.interpolate({
                                inputRange,
                                outputRange: [0, 1, 0],
                            });

                            const translateY = scrollX.interpolate({
                                inputRange,
                                outputRange: [50, 0, 20],
                                extrapolate: 'clamp',

                            });
                            return (
                                <Animated.View

                                    style={{
                                        width,
                                        alignItems: 'center',
                                        paddingVertical: SPACING * 2,
                                        opacity,
                                        transform: [{
                                            translateY
                                        }]

                                    }}>

                                    <Image source={{ uri: item.image }}
                                        style={{ width: IMAGE_WIDTH, height: IMAGE_HEIGHT, resizeMode: 'cover' }}
                                    />

                                </Animated.View>
                            )
                        }}
                    />

                    <View
                        style={{
                            paddingVertical: SPACING * 4,
                            marginLeft: SPACING,
                            width: IMAGE_WIDTH,
                            alignItems: 'center'
                        }}>

                        {DATA.map((item, index) => {
                            const inputRange = [
                                (index - 0.2) * width,
                                index * width,
                                (index + 0.2) * width,
                            ];

                            const opacity = scrollX.interpolate({
                                inputRange,
                                outputRange: [0, 1, 0]
                            });

                            const rotateY = scrollX.interpolate({
                                inputRange,
                                outputRange: ['45deg', '0deg', '45deg']
                            });

                            return (
                                <Animated.View
                                    key={item.key}
                                    style={{
                                        opacity,
                                        position: 'absolute',
                                        transform: [{ perspective: IMAGE_WIDTH * 4 },
                                        { rotateY }
                                        ]
                                    }}>
                                    <Content item={item} />
                                </Animated.View>
                            )
                        }
                        )}
                    </View>

                    <Animated.View
                        style={{
                            width: IMAGE_WIDTH + SPACING * 4,
                            backgroundColor: '#fff',
                            position: 'absolute',
                            zIndex: -1,
                            top: SPACING * 2,
                            left: SPACING,
                            bottom: 0,
                            shadowColor: '#000',
                            shadowOpacity: 0.2,
                            shadowRadius: 30,
                            shadowOffset: {
                                width: 0,
                                height: 0,
                            },
                            elevation: 5,
                            transform: [
                                {
                                    perspective: IMAGE_WIDTH * 4,
                                },
                                {
                                    rotateY: progress.interpolate({
                                        inputRange: [0, 0.5, 1],
                                        outputRange: ['0deg', '90deg', '180deg']
                                    })
                                }
                            ]


                        }}
                    >

                    </Animated.View>
                </View>



                <View

                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: IMAGE_WIDTH + SPACING * 4,
                        paddingHorizontal: SPACING,
                        paddingVertical: SPACING,
                    }}
                >

                                <TouchableOpacity

                                    disabled={index === 0}
                                    style={{ opacity: index === 0 ? 0.2 : 1 }}
                                    onPress={() => {

                                        // console.log(index);
                                        ref?.current?.scrollToOffset({
                                            offset: width * (index - 1),
                                            animated: true,
                                        });
                                    }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                        <Text style={{ fontSize: 12, fontWeight: '800' }}>PREV</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableNativeFeedback
                                  
                                    disabled={index === (DATA.length) - 1}
                                    style={{ opacity: index === (DATA.length) - 1 ? 0.2 : 1 }}
                                    onPress={() => {
                                        // pagiButton
                                        ref?.current?.scrollToOffset({
                                            offset: (index+1)*width,
                                            animated:true
                                          });

                                        // console.log(offset);
                                    }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 12, fontWeight: '800' }}>NEXT</Text>

                                    </View>
                                </TouchableNativeFeedback>
                 



                </View>



            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#ccc'
    },
    carouselButton: {
        // flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16
    }
})
export default App
