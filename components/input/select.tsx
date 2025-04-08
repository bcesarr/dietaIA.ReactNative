import { View , Text, StyleSheet, TouchableOpacity, FlatList, Modal } from 'react-native';
import { Controller } from 'react-hook-form';
import { colors } from '../../constants/colors';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';

interface OptionsProps{
    label: string;
    value: string | number;
}

interface SelectProps{
    name: string;
    control: any;
    placeholder?: string;
    error?: string;
    options: OptionsProps[]
}

export function Select({ name, control, placeholder, error, options }: SelectProps) {
    
    // Utilizando o useState
    const [visible, setVisible] = useState(false);


    return (
        <View style={styles.container}>
            <Controller
                control={control}
                name={name}

                render={({ field: { onChange, onBlur, value }}) => (
                    <>
                        <TouchableOpacity style={styles.select} onPress={() => setVisible(true)}>
                            <Text>
                                {value ? options.find(option => option.value === value) ?.label : placeholder}
                            </Text>
                            <Feather name='arrow-down' size={16} color='#000'/>
                        </TouchableOpacity>

                        <Modal
                            visible={visible}
                            animationType='fade'
                            transparent={true}
                            onRequestClose={() => setVisible(false)}
                        >
                            <TouchableOpacity
                                style={styles.modalContainer}
                                activeOpacity={1}
                                onPress={() => setVisible(false)}
                            >
                                <TouchableOpacity style={styles.modalContent} activeOpacity={1}>
                                    <FlatList 
                                        contentContainerStyle={{ gap: 4 }}

                                        data={options}
                                        keyExtractor={(item) => item.value.toString() }
                                        renderItem={ ({ item }) => (
                                            <TouchableOpacity
                                                style={styles.option}
                                                onPress={() => {
                                                    onChange(item.value)
                                                    setVisible(false)
                                                }}
                                            >
                                                <Text>{item.label}</Text>
                                            </TouchableOpacity>    
                                        )}
                                    />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        </Modal>
                    </>
                )}
            />

            {error && <text style={styles.errorText}>{error}</text>}
        </View>
    )
}

// Criando próprio grupo de estilização
const styles = StyleSheet.create({
    container: {
        marginBottom: 16
    },
    input: {
        height: 44,
        backgroundColor: colors.white,
        paddingHorizontal: 10,
        borderRadius: 4
    },
    errorText: {
        color: 'red',
        marginTop: 4
    },
    select: {
        height: 44,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: colors.white,
        borderRadius: 4
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0, 0.5)'
    },
    modalContent: {
        padding: 20,
        marginHorizontal: 10,
        backgroundColor: colors.white,
        borderRadius: 8
    },
    option: {
        paddingVertical: 14,
        paddingHorizontal: 8,
        backgroundColor: 'rgba(208,208,208, 0.40)',
        borderRadius: 4
    }
}) 