import { FirestoreBaseService } from "@/services/firebase/base/firestore-base.service";
import { BudgetItem } from "@/types/budget-item";
import { UpsertBudgetItemDTO } from "./dtos/upsert-budget-item.dto";
import { BudgetItemDTO } from "./dtos/budget-items.dto";

class BudgetItemsService extends FirestoreBaseService<BudgetItem> {
  constructor() {
    super("budget_items");
  }

  async saveItemBudget(data: UpsertBudgetItemDTO) {
    return super.upsert(data.id, data);
  }

  async getItemsByBudgetId(budgetId: string): Promise<BudgetItemDTO[]> {
    const snapshot = await this.collection()
      .where("budget_id", "==", budgetId)
      .orderBy("created_at", "asc")
      .get();

    return snapshot.docs.map(doc => this.toDTO(doc.id, doc.data() as BudgetItem));
  }

  async deleteItemsByBudgetId(budgetId: string) {
    const snapshot = await this.collection()
      .where("budget_id", "==", budgetId)
      .get();

    const batch = snapshot.docs.map(doc => doc.ref.delete());
    await Promise.all(batch);
  }

  private toDTO(id: string, data: BudgetItem): BudgetItemDTO {
    return {
      id,
      budget_id: data.budget_id,
      name: data.name,
      quantity: data.quantity,
      value: data.value,
      description: data.description,
      created_at: data.created_at?.toDate().toISOString(),
      updated_at: data.updated_at?.toDate().toISOString(),
    };
  }
}

export const budgetItemsService = new BudgetItemsService();
