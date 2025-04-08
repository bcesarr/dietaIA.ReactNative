import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useDataStore } from '../../store/data';
import { colors } from '@/constants/colors';

export default function Nutrition() {
    const user = useDataStore(state => state.user)
    console.log(user);

    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <View style={styles.contentHeader}>
                    <Text style={styles.title}>Minha dieta</Text>
                    
                    <Pressable style={styles.buttonShare}>
                        <Text style={styles.buttonShareText}>Compartilhar</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

// Criando grupo de estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    containerHeader: {
        backgroundColor: colors.white,
        borderBottomLeftRadius: 14,
        borderBottomRightRadius: 14,
        paddingTop: 60,
        paddingBottom: 20,
        marginBottom: 16
    },
    contentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 16,
        paddingRight: 16
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.background
    },
    buttonShare: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        backgroundColor: colors.blue,
        borderRadius: 4
    },
    buttonShareText: {
        fontWeight: 'semibold',
        color: colors.white
    }
}) 