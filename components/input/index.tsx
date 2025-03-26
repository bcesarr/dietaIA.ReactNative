import { View , Text, StyleSheet, TextInput, KeyboardTypeOptions } from 'react-native';
import { Controller } from 'react-hook-form';

interface InputProps{
    name: string,
    control: any,
    placeholder?: string,
    rules?: object,
    error?: string,
    keyboardType: KeyboardTypeOptions;
}

export function Input({ name, control, placeholder, rules, error, keyboardType }: InputProps) {
    return (
        <View style={styles.container}>
            <Controller
                control={control}
                name={name}
                rules={rules}

                render={({ field: { onChange, onBlur, value }}) => (
                    <TextInput
                        placeholder={ placeholder }
                        onBlur={onBlur}
                        value={value}
                        onChangeText={onChange}
                        keyboardType='default'
                    />
                )}
            />
        </View>
    )
}

// Criando próprio grupo de estilização
const styles = StyleSheet.create({
    container: {
        marginBottom: 16
    }
}) 