import { create } from 'zustand';

export type User = {
    name: string;
    weight: string;
    age: string;
    height: string;
    gender: string;
    level: string;
    objective: string;
}

type DataState = {
    user: User;
    setPageOne: (data: Omit<User, 'gender' | 'level' | 'objective'>) => void;

    setPageTwo: (data: Pick<User, 'gender' | 'level' | 'objective'>) => void;
}

export const useDataStrore = create<DataState>((set) =>({
    user: {
        name: '',
        weight: '',
        height: '',
        age: '',
        gender: '',
        level: '',
        objective: ''
    },
    setPageOne: (data) => set((state) => ({ user: {...state.user, ...data} })),

    setPageTwo: (data) => set((state) => ({ user: {...state.user, ...data} }))
}))