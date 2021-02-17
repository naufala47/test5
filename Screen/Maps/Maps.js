import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
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

class Maps extends Component {
    render() {
        return (

            <MapView
                style={{ flex: 1 }}
                provider={PROVIDER_GOOGLE}
                showsUserLocation
                initialRegion={{
                    latitude: -6.248176363307238,
                    longitude: 106.8181355549056,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }} >
                <MapView.Marker
                    coordinate={{
                        latitude: -6.248176363307238,
                        longitude: 106.8181355549056,
                    }}
                    title="Lokasi"
                    description="Hello" />
            </MapView>

        );
    }
}

export default Maps;