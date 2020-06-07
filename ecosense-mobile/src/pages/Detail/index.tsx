import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Feather as Icon, FontAwesome } from "@expo/vector-icons";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";

const Details = () => {
  const navigation = useNavigation();
  function handleNavigateBack() {
    navigation.goBack();
  }
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={20} color="#34cb79"></Icon>
        </TouchableOpacity>

        <Image
          style={styles.pointImage}
          source={{ uri: "https://i.picsum.photos/id/776/200/300.jpg" }}
        ></Image>
        <Text style={styles.pointName}>Mercado Michelina</Text>
        <Text style={styles.pointItems}>Lâmpada, Oléo de Cozinha</Text>

        <View style={styles.address}>
          <Text style={styles.addressTitle}>Address</Text>
          <Text style={styles.addressContent}>São Paulo, SP</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={() => {}}>
          <FontAwesome name="whatsapp" size={20} color="#FFF"></FontAwesome>
          <Text style={styles.buttonText}>Contact</Text>
        </RectButton>
        <RectButton style={styles.button} onPress={() => {}}>
          <Icon name="mail" size={20} color="#FFF"></Icon>
          <Text style={styles.buttonText}>E-mail</Text>
        </RectButton>
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

  pointImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
    borderRadius: 10,
    marginTop: 32,
  },

  pointName: {
    color: "#322153",
    fontSize: 28,
    fontFamily: "Ubuntu_700Bold",
    marginTop: 24,
  },

  pointItems: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
    color: "#6C6C80",
  },

  address: {
    marginTop: 32,
  },

  addressTitle: {
    color: "#322153",
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
  },

  addressContent: {
    fontFamily: "Roboto_400Regular",
    lineHeight: 24,
    marginTop: 8,
    color: "#6C6C80",
  },

  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: "#999",
    paddingVertical: 20,
    paddingHorizontal: 32,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  button: {
    width: "48%",
    backgroundColor: "#34CB79",
    borderRadius: 10,
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    marginLeft: 8,
    color: "#FFF",
    fontSize: 16,
    fontFamily: "Roboto_500Medium",
  },
});

export default Details;
