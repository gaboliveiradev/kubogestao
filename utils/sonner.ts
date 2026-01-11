/* eslint-disable @typescript-eslint/no-unused-expressions */
import { ServiceResponse } from '@/types/service-response';
import { toast } from 'sonner';

export function showErrorSonner(message: string | undefined) {
    toast.error('Erro(s)', {
        description: message,
        className: 'whitespace-pre-line',
        duration: 5000,
    });
}

export function showSuccessSonner(message: string | undefined) {
    toast.success('Sucesso', {
        description: message,
        className: 'whitespace-pre-line',
        duration: 5000,
    });
}

type ToastType = "success" | "error" | "info" | "warning";

export function showPersonalizedSonner(title: string, message: string, type: ToastType) {
    toast[type](title, {
        description: message,
        className: 'whitespace-pre-line',
        duration: 5000,
    });
}

export function handleFormFeedback<T>({ state }: { state: ServiceResponse<T> }) {
    if (state.success === null) return;

    state.success ? showSuccessSonner(state.message) : showErrorSonner(state.message);
}