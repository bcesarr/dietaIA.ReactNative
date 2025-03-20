import { View , Text, StyleSheet, TextInput } from 'react-native';

export function Input() {
    return (
        <View style={styles.container}>
            <TextInput placeholder='Digite algo...'/>
        </View>
    )
}

// Criando próprio grupo de estilização
const styles = StyleSheet.create({
    container: {
        marginBottom: 16
    }
}) 