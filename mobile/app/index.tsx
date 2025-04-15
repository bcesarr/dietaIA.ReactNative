import { colors } from "../constants/colors";
import { Link } from 'expo-router';
import { Text, View, Image, StyleSheet, Pressable } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>

      <Image style={{ marginBottom: 16 }}
        source={require('../assets/images/logo.png')}
      />

      <Text style={styles.title}>Dieta <Text style={{ color: colors.white }}>.IA</Text></Text>

      <Text style={styles.text}>Dieta personalizada com Inteligência Artificial</Text>

      <Link href="/step" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Gerar dieta</Text>
        </Pressable>
      </Link>
    </View>
  );
}

// Criando um grupo de estilo próprio
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.green
  },
  text: {
    width: 240,
    marginTop: 8,
    marginBottom: 8,
    fontSize: 16,
    color: colors.white,
    textAlign: 'center'
  },
  button: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 34,
    backgroundColor: colors.blue,
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white
  }
})