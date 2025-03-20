import { colors } from '../../constants/colors';
import { Header } from '../../components/header';
import { Input } from '../../components/input';
import { View, Text, Image, StyleSheet, Pressable, ScrollView } from 'react-native';

export default function Step() {
    return (
        <View style={styles.container}>
            
            <Header step='Passo 1' title= 'Vamos começar'/>

            <ScrollView style={styles.content}>
                <Text style={styles.label}>Nome:</Text>
                <Input /> 
            </ScrollView>

        </View>
    )
}

// Criando grupo de estilos próprios
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    content: {
        paddingLeft: 16,
        paddingRight: 16
    },
    label: {
        marginBottom: 8,
        fontSize: 16,
        color: colors.white,
        fontWeight: 'bold'
    }
})