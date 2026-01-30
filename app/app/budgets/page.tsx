import Header from "@/components/common/Header";
import BudgetsFormModal from "./budgets-form-modal";
import { getBudgets } from "@/actions/budgets/get-budgets.action";
import BudgetList from "./budgets-list";
import { Suspense } from "react";
import Loader from "@/components/common/loader/Loader";

function BudgetListWrapper() {
    const budgetsPromise = getBudgets();
    return budgetsPromise.then(budgets => <BudgetList data={budgets.data} />);
}

export default function ClientsPage() {
    return (
        <>
            <Header title="Orçamentos" pathList="/app/budgets" formComponent={<BudgetsFormModal />} size="lg" />
            <Suspense fallback={<Loader />}>
                <BudgetListWrapper />
            </Suspense>
        </>
    )
}