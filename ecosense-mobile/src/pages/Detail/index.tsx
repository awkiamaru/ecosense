import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Feather as Icon, FontAwesome } from "@expo/vector-icons";
import Constants from "expo-constants";
import { useNavigation, useRoute } from "@react-navigation/native";
import api from "../../services/api";
import * as MailComposer from "expo-mail-composer";

interface Params {
  pointId: number;
}

interface Data {
  serializedPoints: {
    image: string;
    name: string;
    email: string;
    contact: string;
    city: string;
    uf: string;
  };
  items: {
    title: string;
  }[];
}

const Details = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [data, setData] = useState<Data>({} as Data);
  const routeParams = route.params as Params;

  useEffect(() => {
    api.get(`points/${routeParams.pointId}`).then((response) => {
      setData(response.data);
    });
  }, []);

  function handleNavigateBack() {
    navigation.goBack();
  }

  function handleComposeMail() {
    MailComposer.composeAsync({
      subject: "Interest in collecting recyclable waste",
      recipients: [data.serializedPoints.email],
    });
  }

  function handleContact() {
    Linking.openURL(
      `whatsapp://send?phone=${data.serializedPoints.contact}&text=I Have interest`
    );
  }

  if (!data.serializedPoints) {
    return null;
  }
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={20} color="#34cb79"></Icon>
        </TouchableOpacity>
        <Image
          style={styles.pointImage}
          source={{
            uri: data.serializedPoints.image ? data.serializedPoints.image : "",
          }}
        ></Image>
        <Text style={styles.pointName}>{data.serializedPoints.name}</Text>
        <Text style={styles.pointItems}>
          {data.items.map((item) => item.title).join(",")}
        </Text>
        <View style={styles.address}>
          <Text style={styles.addressTitle}>Address</Text>
          <Text style={styles.addressContent}>
            {data.serializedPoints.city}, {data.serializedPoints.uf}
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={handleContact}>
          <FontAwesome name="whatsapp" size={20} color="#FFF"></FontAwesome>
          <Text style={styles.buttonText}>Contact</Text>
        </RectButton>
        <RectButton style={styles.button} onPress={handleComposeMail}>
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
