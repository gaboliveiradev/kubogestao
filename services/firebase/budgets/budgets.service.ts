import { FirestoreBaseService } from "@/services/firebase/base/firestore-base.service";
import { Budget } from "@/types/budget";
import { BudgetDTO } from "./dtos/budgets.dto";
import { UpsertBudgetDTO } from "./dtos/upsert-budget.dto";

class BudgetsService extends FirestoreBaseService<Budget> {
    constructor() {
        super("budgets");
    }

    async countBudgets(userId: string): Promise<number> {
        const snapshot = await this.collection()
            .where("user_id", "==", userId)
            .count()
            .get();

        return snapshot.data().count;
    }

    async saveBudget(data: UpsertBudgetDTO): Promise<{ id: string }> {
        return super.upsert(data.id, data);
    }

    async getBudgets(userId: string): Promise<BudgetDTO[]> {
        const snapshot = await this.collection()
            .where("user_id", "==", userId)
            .orderBy("created_at", "desc")
            .get();

        return snapshot.docs.map(doc =>
            this.toDTO(doc.id, doc.data() as Budget)
        );
    }

    async getBudgetById(id: string): Promise<BudgetDTO | null> {
        const data = await super.getById(id);
        if (!data) return null;

        return this.toDTO(id, data);
    }

    async deleteBudget(id: string) {
        const budget = await this.getById(id);

        if (!budget) {
            throw new Error("Orçamento não encontrado.");
        }

        await super.delete(id);
    }

    private toDTO(id: string, data: Budget): BudgetDTO {
        return {
            id,
            user_id: data.user_id,
            client_id: data.client_id,
            client_name: data.client_name,
            client_document: data.client_document,
            budget_email: data.budget_email,
            budget_phone: data.budget_phone,
            responsible_client_name: data.responsible_client_name,
            client_zipcode: data.client_zipcode,
            client_address: data.client_address,
            client_number: data.client_number,
            client_city: data.client_city,
            client_state: data.client_state,
            observations: data.observations,
            budget_key: data.budget_key,
            total: data.total,
            created_at: data.created_at?.toDate().toISOString(),
            updated_at: data.updated_at?.toDate().toISOString(),
        };
    }
}

export const budgetsService = new BudgetsService();
