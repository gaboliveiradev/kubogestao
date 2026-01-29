import { FirestoreBaseService } from "@/services/firebase/base/firestore-base.service";
import { Client } from "@/types/client";
import { ClientDTO } from "./dtos/clients.dto";
import { UpsertClientDTO } from "./dtos/upsert-clients.dto";

class ClientsService extends FirestoreBaseService<Client> {
  constructor() {
    super("clients");
  }

  async countClients(userId: string): Promise<number> {
    const snapshot = await this.collection()
      .where("user_id", "==", userId)
      .count()
      .get();

    return snapshot.data().count;
  }

  async saveClients(data: UpsertClientDTO): Promise<{ id: string }> {
    return super.upsert(data.id, data);
  }

  async getClients(userId: string): Promise<ClientDTO[]> {
    const snapshot = await this.collection()
      .where("user_id", "==", userId)
      .orderBy("created_at", "desc")
      .get();

    return snapshot.docs.map((doc) => this.toDTO(doc.id, doc.data() as Client));
  }

  async getClientById(id: string): Promise<ClientDTO | null> {
    const data = await super.getById(id);

    if (!data) return null;

    return this.toDTO(id, data);
  }

  async deleteClient(id: string): Promise<void> {
    const client = await this.getById(id);

    if (!client) {
      throw new Error("O ID do cliente informado não existe.");
    }

    await super.delete(id);
  }

  private toDTO(id: string, data: Client): ClientDTO {
    return {
      id,
      user_id: data.user_id,

      document: data.document,
      corporate_name: data.corporate_name,
      fantasy_name: data.fantasy_name,
      company_nickname: data.company_nickname,
      responsible_name: data.responsible_name,

      zipcode: data.zipcode,
      address: data.address,
      number: data.number,
      neighborhood: data.neighborhood,
      city: data.city,
      state: data.state,

      customer_email: data.customer_email,
      billing_email: data.billing_email,

      customer_phone: data.customer_phone,
      responsible_phone: data.responsible_phone,
      billing_phone: data.billing_phone,

      budget_key: data.budget_key,

      created_at: data.created_at?.toDate().toISOString(),
      updated_at: data.updated_at?.toDate().toISOString(),
    };
  }
}

export const clientsService = new ClientsService();
