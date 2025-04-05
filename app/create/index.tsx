import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { colors } from '../../constants/colors';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Header } from "@/components/header";
import { Select } from '../../components/input/select'

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

    const genderOptions = [
        { label: 'Massculino', value: 'Masculino' },
        { label: 'Feminino', value: 'Feminino' }
    ]

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
                    error={errors.gender?.message}
                    options={genderOptions}
                />
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
})