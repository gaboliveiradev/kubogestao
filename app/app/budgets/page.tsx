import Header from "@/components/common/Header";
import BudgetsFormModal from "./budgets-form-modal";


export default function ClientsPage() {
    return (
        <>
            <Header title="Orçamentos" pathList="/app/budgets" formComponent={<BudgetsFormModal />} size="lg" />
        </>
    )
}