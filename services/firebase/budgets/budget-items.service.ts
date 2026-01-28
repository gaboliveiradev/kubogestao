import { FirestoreBaseService } from "@/services/firebase/base/firestore-base.service";
import { BudgetItem } from "@/types/budget-item";
import { UpsertBudgetItemDTO } from "./dtos/upsert-budget-item.dto";

class BudgetItemsService extends FirestoreBaseService<BudgetItem> {
  constructor() {
    super("budget_items");
  }

  async saveItemBudget(data: UpsertBudgetItemDTO) {
    return super.upsert(data.id, data);
  }

  async getItemsByBudgetId(budgetId: string): Promise<BudgetItem[]> {
    const snapshot = await this.collection()
      .where("budget_id", "==", budgetId)
      .orderBy("created_at", "asc")
      .get();

    return snapshot.docs.map(doc => doc.data() as BudgetItem);
  }

  async deleteItemsByBudgetId(budgetId: string) {
    const snapshot = await this.collection()
      .where("budget_id", "==", budgetId)
      .get();

    const batch = snapshot.docs.map(doc => doc.ref.delete());
    await Promise.all(batch);
  }
}

export const budgetItemsService = new BudgetItemsService();
