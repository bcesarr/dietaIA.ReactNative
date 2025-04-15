import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { colors } from '../../constants/colors';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Header } from "@/components/header";
import { Select } from '../../components/input/select';
import { useDataStore } from '../../store/data';
import { router } from 'expo-router';

const schema = z.object({
    gender: z.string().min(1, { message: 'O sexo é obrigatório' }),
    objective: z.string().min(1, { message: 'O objetivo é obrigatório' }),
    level: z.string().min(1, { message: 'Selecione seu level' })
})

type FormData = z.infer<typeof schema>

export default function Create() {
    const { control, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const setPageTwo = useDataStore(state => state.setPageTwo)

    const genderOptions = [
        { label: 'Masculino', value: 'Masculino' },
        { label: 'Feminino', value: 'Feminino' }
    ]

    const levelOptions = [
        { label: 'Sedentário (pouco ou nenhuma atividade física)', value: 'Sedentário' },
        { label: 'Levemente ativo (exercícios de 1 a 3 vezes na semana)', value: 'Levemente ativo (exercícios de 1 a 3 vezes na semana)' },
        { label: 'Moderadamente ativo (exercícios de 3 a 5 vezes na semana)', value: 'Moderadamente ativo (exercícios de 3 a 5 vezes na semana)' },
        { label: 'Altamente ativo (exercícios de 5 a 7 dias na semana)', value: 'Altamente ativo (exercícios de 5 a 7 dias na semana)' }
    ]

    const objectiveOptions = [
        { label: 'Emagrecer', value: 'Emagrecer' },
        { label: 'Hipertrofia', value: 'Hipertrofia' },
        { label: 'Hipertrofia + Definição', value: 'Hipertrofia + Definição' },
        { label: 'Definição', value: 'Definição' }
    ]

    function handleCreate(data: FormData) {
        setPageTwo({
            gender: data.gender,
            level: data.level,
            objective: data.objective
        })

        router.push('/nutrition')
    }

    return (
        <View style={styles.container}>
            <Header
                step='Passo 2'
                title='Finalizando dieta'
            />

            <ScrollView style={styles.content}>
                <Text style={styles.label}>Sexo: </Text>
                <Select
                    control={control}
                    name='gender'
                    placeholder='Selecione o seu sexo...'
                    error={errors.gender?.message}
                    options={genderOptions}
                />

                <Text style={styles.label}>Selecione o nível de atividade física: </Text>
                <Select
                    control={control}
                    name='level'
                    placeholder='Selecione o seu nível de atividades físicas'
                    error={errors.level?.message}
                    options={levelOptions}
                />

                <Text style={styles.label}>Selecione o seu objetivo: </Text>
                <Select
                    control={control}
                    name='objective'
                    placeholder='Selecione o seu objetivo'
                    error={errors.objective?.message}
                    options={objectiveOptions}
                />

                <Pressable style={styles.button} onPress={handleSubmit(handleCreate)}>
                    <Text style={styles.buttonText}>Avançar</Text>
                </Pressable>
            </ScrollView>

        </View>
    );
}

// Grupo de estilos
const styles = StyleSheet.create({
    content: {
        paddingLeft: 16,
        paddingRight: 16
    },
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    label: {
        marginBottom: 8,
        fontSize: 16,
        color: colors.white,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: colors.blue,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    },
    buttonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold'
    }
})