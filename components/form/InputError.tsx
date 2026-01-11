export const InputError = ({ text }: { text: string | undefined }) => {
    return (
        <>
            {text && <p className="text-red-500 text-xs">{text}</p>}
        </>
    )
}