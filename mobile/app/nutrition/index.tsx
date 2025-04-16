import { View, Text, StyleSheet, Pressable, ScrollView, Share } from 'react-native';
import { useDataStore } from '../../store/data';
import { api } from '../../services/api';
import { useQueries, useQuery } from '@tanstack/react-query';
import { colors } from '@/constants/colors';
import { Data } from '../../types/data';
import { Link, router } from 'expo-router';
import { object } from 'zod';
import { Feather, Ionicons } from '@expo/vector-icons';

interface ResponseData {
    data: Data
}

export default function Nutrition() {
    const user = useDataStore(state => state.user)
    
    const { data, isFetching, error } = useQuery({
        queryKey: ['nutrition'],
        queryFn: async () => {
            try {
                if(!user){
                    throw new Error('filed load nutrition')
                }

                // Para usar o teste da API ao invés da de baixo que é a principal direto na IA
                // const response = await api.get<ResponseData>('/teste')

                // Usando a API direto
                const response = await api.post<ResponseData>('/create', {
                    name: user.name,
                    age: user.age,
                    weight: user.weight,
                    height: user.height,
                    gender: user.gender,
                    level: user.level,
                    objective: user.objective
                })

                return response.data.data

            } catch (err) {
                console.log(err)
            }
        }
    })

    async function handleShare() {
        try {
            if(data && Object.keys(data).length === 0) return

            const suplements = `${data?.suplementos.map( (item: string) => `${item}`)}`

            const foods = `${data?.refeicoes.map( item => `\n- Nome: ${item.nome}\n- Horario: ${item.horario}\n- Alimentos: ${item.alimentos.map( alimento => `${alimento}` )}`)}`

            const message = `Dieta do(a): ${data?.nome} - Objetivo: ${data?.objetivo}\n\n${foods}\n\n- Dica de Suplementos: ${suplements}`

            await Share.share({
                message: message
            })

        } catch(err) {
            console.log(err)
        }
    }

    if(isFetching) {
        return (
            <View style={styles.loading}>
                <Text style={styles.loadingText}>Estamos gerando sua dieta!</Text>
                <Text style={styles.loadingText}>Consultando IA...</Text>
            </View>
        )
    }

    if(error) {
        return (
            <View style={styles.loading}>
                <Text style={styles.loadingText}>Falha ao gerar a dieta</Text>
                <Link href="/">
                    <Text style={styles.loadingText}>Tente novamente</Text>
                </Link>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <View style={styles.contentHeader}>
                    <Text style={styles.title}>Minha dieta</Text>

                    <Pressable style={styles.buttonShare} onPress={handleShare}>
                        <Text style={styles.buttonShareText}>Compartilhar</Text>
                    </Pressable>
                </View>
            </View>

            <View style={{ paddingLeft: 16, paddingRight: 16, flex: 1}}>
                {data && Object.keys(data).length > 0 && (
                    <>
                        <Text style={styles.name}>Nome: {data.nome}</Text>
                        <Text style={styles.objective}>Foco: {data.objetivo}</Text>

                        <Text style={styles.label}>Refeições: </Text>

                        <ScrollView>
                            <View style={styles.foods}>
                                {data.refeicoes.map( (refeicao: { horario: string; nome: string; alimentos: string[] } ) => (
                                    <View key={refeicao.nome} style={styles.food}>
                                        <View style={styles.foodHeader}>
                                            <Text style={styles.foodName}>{refeicao.nome}</Text>
                                            <Ionicons name='restaurant' size={16} color={'#000'} />
                                        </View>

                                        <View style={styles.foodContent}>
                                            <Feather name='clock' size={14} color='#000'/>
                                            <Text>Horario: {refeicao.horario}</Text>
                                        </View>

                                        <Text style={styles.foodText}>Alimentos: </Text>
                                        {refeicao.alimentos.map( (alimento: string) => (
                                            <Text key={alimento}>{alimento}</Text>
                                        ))}

                                    </View>
                                ))}
                            </View>

                            <View style={styles.suplements}>
                                <Text style={styles.foodName}>Dica de suplementos: </Text>
                                {data.suplementos.map( (item: string) => (
                                    <Text key={item}>{item}</Text>
                                ))}        
                            </View>

                            <Pressable style={styles.button} onPress={ () => router.replace("/") }>
                                <Text style={styles.buttonText}>Gerar nova dieta</Text>
                            </Pressable>

                        </ScrollView>
                    </>
                )}
            </View>
        </View>
    );
}

// Criando grupo de estilos
const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background
    },
    loadingText: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 10,
        color: colors.white,
        marginBottom: 4
    },
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
        color: colors.white,
        marginBottom: 6
    },
    foods: {
        backgroundColor: colors.white,
        borderRadius: 8,
        marginTop: 4,
        padding: 14,
        gap: 8
    },
    food: {
        backgroundColor: 'rgba(208, 208, 208, 0.40)',
        borderRadius: 8,
        padding: 8
    },
    foodHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4
    },
    foodName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    foodContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4
    },
    foodText: {
        fontSize: 16,
        marginBottom: 4,
        marginTop: 14
    },
    suplements: {
        backgroundColor: colors.white,
        borderRadius: 8,
        marginTop: 14,
        marginBottom: 14,
        padding: 14
    },
    button: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.blue,
        borderRadius: 4,
        marginBottom: 24
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.white
    }
})