import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    FlatList,
    PermissionsAndroid,
    Platform,
    ToastAndroid
} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './style';
import auth from '@react-native-firebase/auth';
import Geolocation from '@react-native-community/geolocation';
import database from '@react-native-firebase/database';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { id: 1, title: "laporan", image: "https://www.freeiconspng.com/thumbs/report-icon/call-report-icon-3.png" },
                { id: 2, title: "History", image: "https://toppng.com/uploads/preview/order-history-icon-export-csv-blue-icon-11553511776dpkqdrksk8.png" },
                { id: 3, title: "Map", image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARcAAAC1CAMAAABCrku3AAABQVBMVEX+/v7t7e3///8go2Hs7OzcSj1Qg8T820LBwcH29vb5+fnz8/Pw8PB/LCb4+PjGxsZHe74vo2i3yuHz//rm8uyt2sPD1uMLnlrf399Jfbu/0VOosIUdnVfO3e4bomP//uf/9vTbRTf930ru9fL44GvKQTPTYFXcTUGQLifN6tzezoXXQDHRUEXrt7PKSDxpu5C9489ZsINHqneWz7Gh0bjNhX/OtLH33NnllI7denHdgnnnnZbpvrv86+jWXlLzzMnVa2HkpJ5ke0vf9+uyX0ZihlWoZEhLkFqtOzKIKyW0PzSCeVCdNC6NcU3FRjzAWUR6v5s6llxRjli7W0SGy6ijZ0hzflPJZkH5vUzigzz90EzWUjPvqUXedTrqlUKZ0rPUXD/Rp53OioXPm5f88aj33lj45X3+/eL66Zb89sr58ren303pAAARIUlEQVR4nO2da3vUuBWAZcdsYkvxNMuEoXsZMkwTmM5ArptAQhK2lC1QStluur1fWMpu4f//gMqS7JFsSbZkeWKn6EOe0TO2cub10blIsgR8gIsfBR4uQURqgFS8kH6FSAXRSkgqAUhqPrsupl+Rzx6kFUiv62zjHqAlbR3MWw+krdOvhJtiIGk9mIvexcadcCl5pF1s/COXj1zMuBStF7ZKSS1gFyJS4VsPMusV8K3zN0F6XWcb90BESgxJiWmNVkK+Amkl5K/T3BTyN3WxcYAZ4gJ9UhCpeLQSkwomnBRAKyH9it6EaAXSr2glopWI1oLONg5knYtW4ho9l97kB11tHHzk8pHLRy4OuHTSNILm7S7zdihxTog5LlqRejv6VcRfF5dd56Jx7D5D/JmKC6Mw+dOg5FAS16Wap4yOxKxUHR1pUl6zxn0/xI87ijaygp9no5K3Pw8g32AMR/cePNy6v0nKbOv45NFp0k2S64IGJG85lyBMoPinj45n0+loNLrGCv44nZ6dnG9gLYIh+v/jkvSW8+PNaUaEKxjN7MGRj2P6fD9yxsV3xUVrX4wapwEE2Lh3JoXCynT68FEEvaA+F4V9oZQiTiQvBIXWQcjTZDdJR71ozbdvHIQQ36CnQrXm8XniVR1L7iB+CRuLX462pnoojMzxKYtF3EkORCXiHrOzkNSmcYgf38aDMl3JetPmPWx/oUPJW5oHBFFUUVlSMsen5MarziUGjzYrKgsDc3YUXXUuCIfkXxsoCymjzXNsqoE7LjamEUmyL+DM7uLrT0yxJGAeATrKW19yHDWFtMSkCJUY8hXyGcquk9wE42rXyRrHOaENFlw2z31nkgMz9xpKnkQs8YBWYw+kcQ9fZtyJUjBH2C05kbx9eQCK/UeWWK6NZqeJbcnyaXvJW8gFHG1aYsFgHm/ECMnn7TvOBW48NnLQYpmeAAC9dulLcXTHnAu2DXY2NwNzjv9DLS4sb3Rmd2GIcGHukHxGzJQB8jn9Vx6ppTeRCvtPEULAP6+hLbiMtjZ85MBjUJkRJAOngIqJaCWmFTKmCiJaCfnr2E0JA+zYrk/WHZSdh/W4XJt+7RtJnlwXcdfF9Ktc3kiVSAhJgWxkg/QZlN2Exjvbw4GL8qs79bBcuzbb8GOvsuRZ3xIHil3Mw0IUPdkdDJZclLVf18WSKEyUDvZZWEt3+RGEO2tuqCwtPa2tLkRhoL0XccYFgJ2hIypLS9+U/OY7pJQozCO22KU+F519UbbOeim4vucMy29mWiivnr28+/z53Zcv7uvQjB6XccnPKcnsS+qPSEn9ESkx8ahsWDaiFTpyKtzkX7jqREtLv9VSubualZc6MpunUSXJmT/KxnxJJWb6oo5fwmpRwBN3vWjtG7WTvv9yVSjP1GCm9xzEL7LOZdIj0bo7dfn2vhrL89VceakEM3rYgjwAbrvj8tQAy+rqXSUY7JEumwsCFaxu1Z72O9UPvXO3iEXTlaZHl80FhuO1WioiFGVQ90yGZXX1lYrLvfpcJHZXNteG5NbLQ30tlyS0r4xl+HvF75T1Il1Pmp6US142XhfWLGp9GQzW9rZfX7ze3l2rBudbFZcXciyrqwo7PXoY1f1ZtecDriu4DNYudvr9MYRwPO5P9vcqoFFGdVLrkpQXihvOkFcuuXYmo3YeIOcy2Fvv4yCRNocDJogT7lIwf1A8/juKboR9tUJfZqeW3tVdfiTlMtzvZ1BSNOPS7PKpgst9FRalgWknl8HeBIpUKJn+az0YJRelvqi5WK+hao7LYPdJkQq5/vquvh8p7IsFlw1Ql4vEJxutIilwGez20bwTIe4z3Nf3IxUXY/ty7Qwk82u11u/SIuTOQMhAhRw79PIZaCF+2WOmBSU2pT+ZTPrYAuMaxlJiX75VcTH1R6Mtv4LkWe4sDinQcXnNKlh+RFSteXkuwwlTEAT769trwySKuZjgjH5chsVl/JI88DLJK62vs84bc1wG+8w9o/FBFs4Nhhf9sBTL0tJ3Ci6m8e7o5LLzowKXvT6zK/1dnsNgt8ro1R8VXC4jP3LLZbDOLu/v5ThUyQSUw3VyC6McgXGRT6vti26VPamAIpe1PjGx3njXZlTmqYqL5fiLXvIS+8LeypjPvEUVZ+jodQIXbF2oyT2wGqxSOSRcXhXAqLFgs1tF8mxuUTrl6jR+GVBnhHuRDZaloW58N9eV1MOY2LzEVSRv9r1PgcsajV3QjlRdynVIOx/wglOZu6/08wGXP98ocNmlDfBjvmt7tOySgj+saUY1VRk1I/Pq2d3nuLx8Vjp/ZOtFmuEyeE0b4MaqBgfjPiljVvp9zQTCsGx6uuJ8Y8v0JTW7/fkvHxzkc0g00fSn70u4VCmzDfpaxCWs31XY3ZTLxJqLMhWoXqYnTt77TBev0g0L+Eq6yLVY4a4L+zJ9mZsQQy5ay1utbB5FlSSfVyTXhYC+c2s7HxAEApcLZl/sudRWmNED4FWTPDcfAHkdcpsHDLaZP5pHu4N9FlBlAzF6LrUVZvPIb8V6TCHe3RuTH8+Fu4Ptg6z0aaItD24yhfmu1gI7rC7tWKcqcBnSEUz0hFeirNAvy4anvq+1ZOr+qYHvWRiXwQEZ8Eay3551spIJky/+VAPL9OuoLheWN8qclODZSlaRiFx2x1QWSYKEcyfynX7idvjFZ3+270ijrY2wsuT69S8yJWJxHa2Ib5qWzAekPx5N8tE+8+Fl5uWLz24v/8VeXc796pKne/2J78jWX18n5cI6CwYjzqINLsb0prGuG2FtWV5e/uvfbLE8MJFcEe/6PE1n80eDHeaP0YQbmhoMDzJepViWl/9uyWV26oALaIRLMk3CCIzX95gjGr5OJyDRWDe1xrAs3/6Hnbrco8+6lVwGr8eMC0Ljyfr+xcX+Tj+dlkVQl0ynWCx70vQYQMf6ktvUTmhd2DGlsMpeMt+YRLheyobsP+Nl1YI5lmKx6kmj2SmbJ6smeWZO5et31TvhxXxFuWOeZH56fyyfnxbjPR2W5dvmPml6zvY+qiq5doPA2u8fScIR3JXorECuwElVLBY9KfFFDt9YBbLOVWNejYLZlSz0QOMDzQhmDsvysmF0l7yPZWxLFjjfyMAM94mtzdQmWRakmVLKa0vSk/5pxGWTTKW1nQuZkp70IZuMgeMn67qJNgkW6qwrp5Cpi249F7Icc/tfOzuTyc76xe6wJPgvYjEyMXQBg1MuDdhdDg0rOihybSHOuqqJSd4nN5dcb3cFL2axs61qnWr1osJS3VmP3vpMdBPJ9X5atllxrbjOsCi1JelJ/66G5bjnh0k/MZI8+7nNvPdZk4sOy/Iv31QyvLPDns1IwCWs361etFhWel+VmhhM7s3KVeOi15YVXLZKwYy+6iVczCU3yRsXy6Ucy8phaU86w1c1wUUyqUQrlut3DUo5lpXeD2X7+r0hXFzvvOd23Nu1tpT3JOyLEi6ezRurC88bXWJZ0fuk2eEK5WLTZ3TzJJfFpSoWvU8ave255uJdHpehARZses/UWB73Vq4Ql6VKJjdTmLdKLpuHK01xobX5TuskcmY+irbOrBJrnVmv7DorLgbakvxq1Y5TSeiScjGXPJjvAMXdlK7zkCRNcWmmxV1n1Y/UWH7xnwIW3JM2dUY34RJaSN7suS028YsGyy3/ZpFL71iqMKMfeukFNpHXAtfv1taWW7hxCZhD2ULw0VlvZc7FXPK25UdabUlsXRGM1FeP3q5cIS5abSFGEcEiGJnCbPWuEJeSTkTdSFgAI1EYTl2a4JJ6tgXZXR0WZvLwUyqCKSjMiFMX27yx3rktSQ0pTz8x8tN6bYnTxkEE8mAKCsMyAPYtjMwln5/bUrzO9twWUpG8l1UDiy82ngdzmHul4qzHU/MsJG/23BYTLiUOWmg8D6YnbhA5j10YFxtb0o78qNTkiudwoByYN4K6pJlR97mUOGg/3zjMxTG9LV5djnuL4FLj3JaqXErjlnzjKBfHCCOaZPTSKRfTc1sA37rk9JMqXPTjLe9uMSEKjYvumre8Wz2RC7KQPH9uC/3K1bktFeMXzcDCu74feYoQgwfDDTeMvsoZZbu8sclzWypx0Y233P78518CHDXI1Z8Dw3Wk0WGBi7nkl58HlGD5BIPBzkgqOh/gzeeSznpXgUsZlk8wmESNZaLHnPHtpVMm2Thdp7mUYyFgYmYtc5see3MwWS6Q80bNzzc63KdtXipgoRpDzvEEfm4rNRhnYN4wLrPDIhdzyfX7tLF97GQHmUgqxevK9oGsoi0pGOl/isIMDEuq09kRjktkIbn25za6jswAC9OYwnZ8MZkpZmCYpy6Yl/w8bBvObSnhUhkLAQMK3T3m3TUzMAXz0rn8qLq2MDA4jpGKzozvW2pg8uala1zMsFCNCQNAxoRE0RFNImkEM8t3o65xMcRC3bVcXyDVmJnU7DaxnqE5u2uqLSkYmWnEAiRgyFhD0ey6t7uBbp98tvMQJZzurcRdR25Sxi82WGhXgoWt7JMjWBLjSyYexaE6ysW3kJxrnLsu3SefaI3xe5/ZyKkyrrPDQo1v2ngmUTbmm6SOwoh3xsVY8nzjC1i/W7K+RYeFxTFIahb8m2+TQ6MKbrpD+ZE1FhbHyIbxseKfTyVZQHe42GtL2pVQLJneiIKNh9PpDwUsza/frdpLPa19qYeFagz9t3kuYONEgsV0vXfNc1vUVp27ScKlLhZqY1jP4SWKvEi6DMTAHwk/V2xc9Efq+MV2/W59LGw8BhZDDACkYDqxftcBFtqVEp8qO2pdsj6mA3mAEywsjkFS0ePiMpDWc3HRiTIwUeRJRS+AaT8XZ1jYYLhUX2B+RVUT63eLdtd6nzaH2sLAhBF9s0M0jdjR3sxzMZe82XNbBD/tFAuLY6T/NRYXDvVqn9NSaN/lfIBjLGw8Zi7EXKtBborW/XyArHPZ5QFuO1EGJgqhNFQXpmhbnB81gYXFMXIunFdqMZdmsCRgkqMiZFz4mcjWcmkKC4tjABkMF7lgW3CzOS4Sz2az/qUxLCyJlJjGAGVxTAPvfTJYmnNbkpqnP7elOW1hYGKI/7MnHK1ChEgn3JCF5OK5LZ723BaZ5gVazSNcGsWSzivlRokCLolUxLt6yRs/t6VZbUk1JgjEVV0B0/Wbbc2PmsfCVjtAJOESkXmlNnJZABYWxyBiD/NccBzT4HuflIvPtV5hlX2A7e7SIrDQOEZmXyKUxDH13g+Q2Zf0fRI6IsretqAjonTjHP70kyh/+kkYX18MFqox4tEqmeRhYC45Gcul1yHuOmfnttx6txgs6eLEoMIsehve+1RycY2FzSuF2VRGUFPyZvMAFRf3WNikftANLr6cSxNY0jimG1x+XBwWFsdQgZrmUtd6fVggFm6db9N2t+a5LRD+dHuBWNgIXlQQ1kbyknNbAKizn0cA/rtILExjyGOuK7l2Pw9Z5zLpkUGU90jNYmFxTGpLakjebH7kwej97UViScdjgpZzwa2/f7dILGkc03ouwP/px0ViYXFMQ1xY3ihzUoJnq7aK5P2PtDN9/rPFlC8jqXu1kNz83Jbik1CefoLz1FvvP3z48P7GjU+TcoOWTz/lakLlRlml7CbfLK7TnNuiWada471PoqFBmHh8+vzYsDF9YjTtZ0+C1vjLxOsi/joWr8X8TYC7icW7dSUv9C1XeQBtPQikU4INid6F/ChrXWIGmxW9I1yU+tLFxmuf25J5Nqn1CjrbeO1zW6w2kW9/47XfP9JGAd1tHMg6l6toutFQvf15wEcubRL9I5dL4dJd09is3RW8mJVXrHpTpxrP4joGi1RpJYuOKGGmofRJMA1lT4KqNXt8VK3Z4+ts4/8DRVgdP8MW0N0AAAAASUVORK5CYII=" },
                { id: 4, title: "Logot", image: "https://www.pngfind.com/pngs/m/339-3396821_png-file-svg-download-icon-logout-transparent-png.png" }
            ],
            counter: 0
        };
    }

    componentDidMount() {
        // console.log("Jalan")
        // Geolocation.getCurrentPosition(
        //     
        // )

    }

    pushPanicButton = () => {
        if (this.state.counter < 2) {
            let dummyCounter = this.state.counter;
            this.setState({ counter: dummyCounter + 1 })
        } else {

            if (this.hasLocationPermission) {
                Geolocation.getCurrentPosition(
                    info => {
                        const { coords } = info

                        console.log(coords.latitude)
                        console.log(coords.longitude)
                        let uniqueId = Date.now()
                        database()
                            .ref('/maps/' + uniqueId)
                            .set({
                                email: 'uniqueId',
                                latitude: coords.latitude,
                                longitude: coords.longitude
                            })
                            .then(() => {

                                Alert.alert("Panik baten", `Laporan di tkp ${coords.latitude},${coords.longitude}`)
                                this.setState({ counter: 1 })
                            });

                    },
                    error => console.log(error),
                    {
                        enableHighAccuracy: false,
                        timeout: 2000,
                        maximumAge: 3600000
                    }
                );
            }
        }
    }

    clickEventListener = (item) => {
        Alert.alert(item.title)
        switch (item.title) {
            case "Map":
                this.props.navigation.navigate("Maps")
                break;

            case "Logot":
                this.props.navigation.navigate("Login")
                break;

            case "laporan":
                this.props.navigation.navigate("Laporan")
                break;

            case "History":
                this.props.navigation.navigate("History")
                break;


            default:
                break;
        }
    }

    logout = () => {
        console.log('logot')
        auth()
            .signOut()
            .then(() => {
                console.log('user keluar')
                this.props.navigation.navigate("Login")
            });
    }

    // componentWillUnmount() {
    //     this.removeLocationUpdates();
    // }

    render() {
        return (
            // <View style={styles.container}>
            //     <KeyboardAwareScrollView
            //         style={{ flex: 1, width: '100%' }}
            //         keyboardShouldPersistTaps="always">
            //         <TouchableOpacity
            //             style={styles.button}
            //             onPress={this.logout}
            //         >
            //             <Text style={styles.buttonTitle}>Logout</Text>
            //         </TouchableOpacity>
            //     </KeyboardAwareScrollView>
            // </View>
            <View style={styles.container}>
                <FlatList style={styles.list}
                    contentContainerStyle={styles.listContainer}
                    data={this.state.data}
                    horizontal={false}
                    numColumns={2}
                    keyExtractor={(item) => {
                        return item.id;
                    }}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={styles.card} onPress={() => this.clickEventListener(item)}>
                                <View style={styles.cardFooter}></View>
                                <Image style={styles.cardImage} source={{ uri: item.image }} />
                                <View style={styles.cardHeader}>
                                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                                        <Text style={styles.title}>{item.title}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }} />
                <View style={styles.container2}>
                    <TouchableOpacity style={[styles.cardRounded, { backgroundColor: "#ff944d" }]} onPress={this.pushPanicButton} >
                        <Image style={styles.cardImage} source={require('../../assets/batenpanik.png')} />
                    </TouchableOpacity>
                </View>
                {/* <View style={styles.container2}>
                    <TouchableOpacity style={[styles.cardRounded, { backgroundColor: "#FF4500" }]} onPress={this.logout} >
                        <Image style={styles.cardImage} source={require('../../assets/logot.png')} />
                    </TouchableOpacity>
                </View> */}
            </View>
        );
    }

    hasLocationPermission = async () => {
        if (Platform.OS === 'ios') {
            const hasPermission = await this.hasLocationPermissionIOS();
            return hasPermission;
        }

        if (Platform.OS === 'android' && Platform.Version < 23) {
            await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );
        }

        const hasPermission = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (hasPermission) {
            return true;
        }

        const status = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (status === PermissionsAndroid.RESULTS.GRANTED) {
            return true;
        }

        if (status === PermissionsAndroid.RESULTS.DENIED) {
            ToastAndroid.show(
                'Location permission denied by user.',
                ToastAndroid.LONG,
            );
        } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            ToastAndroid.show(
                'Location permission revoked by user.',
                ToastAndroid.LONG,
            );
        }

        return false;
    };

    // removeLocationUpdates = () => {
    //     if (this.watchId !== null) {
    //         this.stopForegroundService();
    //         Geolocation.clearWatch(this.watchId);
    //         this.watchId = null;
    //         this.setState({ updatesEnabled: false });
    //     }
    // };

    // startForegroundService = async () => {
    //     if (Platform.Version >= 26) {
    //         await VIForegroundService.createNotificationChannel({
    //             id: 'locationChannel',
    //             name: 'Location Tracking Channel',
    //             description: 'Tracks location of user',
    //             enableVibration: false,
    //         });
    //     }

    //     return VIForegroundService.startService({
    //         channelId: 'locationChannel',
    //         id: 420,
    //         title: appConfig.displayName,
    //         text: 'Tracking location updates',
    //         icon: 'ic_launcher',
    //     });
    // };

}

export default Dashboard;