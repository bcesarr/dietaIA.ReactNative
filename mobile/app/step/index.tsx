import { colors } from '../../constants/colors';
import { Header } from '../../components/header';
import { Input } from '../../components/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { View, Text, Image, StyleSheet, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useDataStore } from '../../store/data';

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

    const setPageOne = useDataStore(state => state.setPageOne)

    function handleCreate(data: FormData) {
        setPageOne({
            name: data.name,
            age: data.age,
            weight: data.weight,
            height: data.height
        });

        router.push("/create")
    }

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

                <Text style={styles.label}>Sua idade atual:</Text>
                <Input 
                    name="age"
                    control={control}
                    placeholder="Digite sua altura: Ex 27"
                    error={errors.age?.message}
                    keyboardType="decimal-pad"
                />

                <Text style={styles.label}>Seu peso atual:</Text>
                <Input 
                    name="weight"
                    control={control}
                    placeholder="Digite seu peso: Ex 54"
                    error={errors.weight?.message}
                    keyboardType="decimal-pad"
                />

                <Text style={styles.label}>Sua altura:</Text>
                <Input 
                    name="height"
                    control={control}
                    placeholder="Digite sua altura: Ex 1.67"
                    error={errors.height?.message}
                    keyboardType="decimal-pad"
                />

                <Pressable style={styles.button} onPress={handleSubmit(handleCreate)}>
                    <Text style={styles.buttonText}>Avançar</Text>
                </Pressable>

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