export const dynamic = "force-dynamic";

import { auth } from "@/lib/auth";
import { getUserSettings } from "@/actions/settings/get-user-settings.action";
import ProfileSection from "./components/ProfileSection";
import BudgetSettingsForm from "./components/BudgetSettingsForm";
import SettingsTabs from "./components/SettingsTabs";

export default async function SettingsPage() {
    const [session, settings] = await Promise.all([auth(), getUserSettings()]);

    return (
        <div className="mx-auto w-full max-w-6xl space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">Configurações</h2>

            <SettingsTabs
                profile={
                    <ProfileSection
                        name={session?.user?.name ?? ""}
                        email={session?.user?.email ?? ""}
                        image={session?.user?.image ?? ""}
                    />
                }
                budget={<BudgetSettingsForm initial={settings.data.budget} />}
            />
        </div>
    );
}
