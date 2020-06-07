import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Alert,
} from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import { SvgUri } from "react-native-svg";
import { ScrollView } from "react-native-gesture-handler";
import * as Location from "expo-location";

import api from "../../services/api";

interface Item {
  itemId: number;
  title: string;
  image: string;
}

interface Point {
  pointId: number;
  image: string;
  name: string;
  email: string;
  contact: string;
  latitude: number;
  longitude: number;
}

const Point = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [points, setPoints] = useState<Point[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  const navigation = useNavigation();
  useEffect(() => {
    api.get("items").then((response) => {
      setItems(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get("points", {
        params: {
          city: "Rio de Janeiro",
          uf: "RJ",
          items: "1",
        },
      })
      .then((response) => {
        setPoints(response.data);
      });
  }, []);

  useEffect(() => {
    async function loadPosition() {
      const { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Ooooops...",
          "We needed your permission for obtain your location"
        );
      }

      const location = await Location.getCurrentPositionAsync();

      const { latitude, longitude } = location.coords;

      setInitialPosition([latitude, longitude]);
    }
    loadPosition();
  }, []);
  function handleNavigateBack() {
    navigation.goBack();
  }
  function handleNavigateToDetail(pointId: number) {
    navigation.navigate("Detail", { pointId });
  }

  function handleSelectItem(itemId: number) {
    const alreadySelected = selectedItems.findIndex((item) => item === itemId);

    if (alreadySelected >= 0) {
      const filteredItem = selectedItems.filter((item) => item !== itemId);
      setSelectedItems(filteredItem);
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  }
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={20} color="#34cb79"></Icon>
        </TouchableOpacity>
        <Text style={styles.title}>Wellcome</Text>
        <Text style={styles.description}>Find in map collect points</Text>

        <View style={styles.mapContainer}>
          {initialPosition[0] !== 0 && (
            <MapView
              style={styles.map}
              loadingEnabled={initialPosition[0] === 0}
              initialRegion={{
                latitude: initialPosition[0],
                longitude: initialPosition[1],
                latitudeDelta: 0.014,
                longitudeDelta: 0.014,
              }}
            >
              {points.map((point) => (
                <Marker
                  key={String(point.pointId)}
                  style={styles.mapMarker}
                  onPress={() => handleNavigateToDetail(point.pointId)}
                  coordinate={{
                    latitude: Number(point.latitude),
                    longitude: Number(point.longitude),
                  }}
                >
                  <View style={styles.mapMarkerContainer}>
                    <Image
                      style={styles.mapMarkerImage}
                      source={{
                        uri: point.image,
                      }}
                    ></Image>
                    <Text style={styles.mapMarkerTitle}>{point.name}</Text>
                  </View>
                </Marker>
              ))}
            </MapView>
          )}
        </View>
      </View>
      <View style={styles.itemsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
          }}
        >
          {items.map((item) => (
            <TouchableOpacity
              key={String(item.itemId)}
              style={[
                styles.item,
                selectedItems.includes(item.itemId) ? styles.selectedItem : {},
              ]}
              onPress={() => handleSelectItem(item.itemId)}
              activeOpacity={0.6}
            >
              <SvgUri width={42} height={42} uri={item.image}></SvgUri>
              <Text style={styles.itemTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20 + Constants.statusBarHeight,
  },

  title: {
    fontSize: 20,
    fontFamily: "Ubuntu_700Bold",
    marginTop: 24,
  },

  description: {
    color: "#6C6C80",
    fontSize: 16,
    marginTop: 4,
    fontFamily: "Roboto_400Regular",
  },

  mapContainer: {
    flex: 1,
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 16,
  },

  map: {
    width: "100%",
    height: "100%",
  },

  mapMarker: {
    width: 90,
    height: 80,
  },

  mapMarkerContainer: {
    width: 90,
    height: 70,
    backgroundColor: "#34CB79",
    flexDirection: "column",
    borderRadius: 8,
    overflow: "hidden",
    alignItems: "center",
  },

  mapMarkerImage: {
    width: 90,
    height: 45,
    resizeMode: "cover",
  },

  mapMarkerTitle: {
    flex: 1,
    fontFamily: "Roboto_400Regular",
    color: "#FFF",
    fontSize: 13,
    lineHeight: 23,
  },

  itemsContainer: {
    flexDirection: "row",
    marginTop: 16,
    marginBottom: 32,
  },

  item: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#eee",
    height: 120,
    width: 120,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginRight: 8,
    alignItems: "center",
    justifyContent: "space-between",

    textAlign: "center",
  },

  selectedItem: {
    borderColor: "#34CB79",
    borderWidth: 2,
  },

  itemTitle: {
    fontFamily: "Roboto_400Regular",
    textAlign: "center",
    fontSize: 13,
  },
});

export default Point;
