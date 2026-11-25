export const InputError = ({ text }: { text: string | undefined }) => {
    if (!text) return null;

    return <small role="alert" className="mt-1 block text-xs text-red-500">{text}</small>;
}
