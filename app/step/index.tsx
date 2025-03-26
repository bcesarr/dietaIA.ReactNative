import { colors } from '../../constants/colors';
import { Header } from '../../components/header';
import { Input } from '../../components/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { View, Text, Image, StyleSheet, Pressable, ScrollView } from 'react-native';

const schema = z.object({
    name: z.string().min(1, { message: 'O nome é obrigatório' }),
    weight: z.string().min(1, { message: 'O peso é obrigatório' }),
    age: z.string().min(1, { message: 'A idade é obrigatória' }),
    height: z.string().min(1, { message: 'A altura é obrigatória' }),
})

type FormData = z.infer<typeof schema>

export default function Step() {
    const { control, handleSubmit, formState:{ errors, isValid } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    return (
        <View style={styles.container}>
            
            <Header step='Passo 1' title= 'Vamos começar'/>

            <ScrollView style={styles.content}>
                <Text style={styles.label}>Nome:</Text>
                <Input 
                    name="name"
                    control={control}
                    placeholder="Digite seu nome..."
                    error={errors.name?.message}
                    keyboardType="default"
                />
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