import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getFirstLetter } from "@/utils/functions/string";

type ProfileSectionProps = {
    name: string;
    email: string;
    image: string;
};

export default function ProfileSection({ name, email, image }: ProfileSectionProps) {
    return (
        <div className="flex items-center gap-4 rounded-2xl border bg-card p-5">
            <Avatar className="size-16 rounded-2xl!">
                <AvatarImage className="rounded-2xl!" src={image} />
                <AvatarFallback className="rounded-2xl! text-xl font-semibold">
                    {getFirstLetter(name)}
                </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
                <h4 className="truncate text-lg font-semibold">{name || "Usuário"}</h4>
                <p className="truncate text-sm text-muted-foreground">{email}</p>
            </div>
        </div>
    );
}
