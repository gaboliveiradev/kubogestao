"use server";

import { auth } from "@/lib/auth";
import { clientsService } from "@/services/firebase/clients/clients.service";

export async function getClientById(id: string) {
  try {
    const userLogged = await auth();

    if (!userLogged?.user?.id) {
      return {
        success: false,
        message: "Você precisa estar logado para realizar esta ação.",
      };
    }

    const client = await clientsService.getClientById(id);

    if (!client) {
      return {
        success: false,
        message: "Nenhum cliente encontrado pelo ID",
        data: null,
      };
    }

    return {
      success: true,
      data: client,
    };
  } catch (error) {
    console.error("Erro ao buscar cliente pelo ID:", error);

    return {
      success: false,
      message: "Ocorreu um erro ao tentar buscar o cliente pelo ID.",
    };
  }
}
