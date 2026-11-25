import { HugeiconsIcon } from "@hugeicons/react";
import { Loading03Icon } from "@hugeicons/core-free-icons";

type Props = {
    loading: boolean;
    /** skeleton: cobre o campo com um shimmer | spinner: ícone girando dentro do campo */
    variant?: "skeleton" | "spinner";
    children: React.ReactNode;
};

export function FieldLoader({ loading, variant = "skeleton", children }: Props) {
    return (
        <div className="relative">
            {children}
            {loading && variant === "skeleton" && (
                <div aria-hidden className="absolute inset-0 animate-pulse rounded-lg bg-muted" />
            )}
            {loading && variant === "spinner" && (
                <HugeiconsIcon
                    icon={Loading03Icon}
                    aria-hidden
                    className="absolute right-2.5 top-1/2 size-4 -translate-y-1/2 animate-spin text-muted-foreground"
                />
            )}
        </div>
    );
}
