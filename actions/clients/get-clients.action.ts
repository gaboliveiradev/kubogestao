"use server";

import { auth } from "@/lib/auth";
import { clientsService } from "@/services/firebase/clients/clients.service";

export async function getClients() {
  try {
    const userLogged = await auth();

    if (!userLogged?.user?.id) {
      return {
        success: false,
        message: "Você precisa estar logado para realizar esta ação.",
        data: [],
      };
    }

    const clients = await clientsService.getClients(userLogged.user.id);

    return {
      success: true,
      data: clients,
    };
  } catch (error) {
    console.error("Erro ao listar clientes:", error);

    return {
      success: false,
      data: [],
    };
  }
}
