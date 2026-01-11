"use server";

import { auth } from "@/lib/auth";
import { clientSchema } from "@/schemas/clients.schema";
import { clientsService } from "@/services/firebase/clients/clients.service";
import { ServiceResponse } from "@/types/service-response";

export async function upsertClient(
  _: ServiceResponse,
  formData: FormData
): Promise<ServiceResponse<{ id: string }>> {
  const userLogged = await auth();

  if (!userLogged?.user?.id) {
    return {
      success: false,
      message: "Você precisa estar logado para realizar esta ação.",
    };
  }

  const raw = Object.fromEntries(formData.entries());
  const parsed = clientSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false,
      message: "Erro de validação",
      errors: parsed.error.flatten().fieldErrors as Record<string, string>,
    };
  }

  const result = await clientsService.saveClients({
    ...parsed.data,
    user_id: userLogged.user.id,
  });

  return {
    success: true,
    message: "Cliente salvo com sucesso",
    data: { id: result.id },
  };
}
