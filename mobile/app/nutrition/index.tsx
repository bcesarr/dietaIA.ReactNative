import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useDataStore } from '../../store/data';
import { colors } from '@/constants/colors';
import { object } from 'zod';

import { Feather, Ionicons } from '@expo/vector-icons';

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

            <View style={{ paddingLeft: 16, paddingRight: 16 }}>
                {data && Object.keys(data).length > 0 && (
                    <>
                        <Text style={styles.name}>Nome: {data.nome}</Text>
                        <Text style={styles.objective}>Foco:{data.objective}</Text>

                        <Text style={styles.label}>Refeições: </Text>

                        <ScrollView>
                            <View style={styles.foods}>
                                {data.refeicoes.map((refeicao) => (
                                    <View style={styles.food}>
                                        <View style={styles.foodHeader}>
                                            <Text>{refeicao.nome}</Text>
                                            <Ionicons name='restaurant' size={16} color={'#000'} />
                                        </View>

                                        <View style={styles.foodContent}>
                                            <Feather name='clock' size={14} color='#000'/>
                                            <Text>{refeicao.horario}</Text>

                                        </View>
                                    </View>
                                ))}
                            </View>
                        </ScrollView>
                    </>
                )}
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
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.white
    },
    objective: {
        fontSize: 16,
        color: colors.white,
        marginBottom: 24
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.white
    },
}) 