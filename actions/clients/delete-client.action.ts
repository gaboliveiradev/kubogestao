"use server";

import { auth } from "@/lib/auth";
import { clientsService } from "@/services/firebase/clients/clients.service";
import { revalidatePath } from "next/cache";

export async function deleteClient(id: string) {
    try {
        const userLogged = await auth();

        if (!userLogged?.user?.id) {
            return {
                success: false,
                message: "Você precisa estar logado para realizar esta ação.",
            };
        }

        await clientsService.deleteClient(id);

        revalidatePath("/app/clients");

        return {
            success: true,
            message: "Cliente excluído com sucesso!",
        };
    } catch (error) {
        console.error("Erro ao remover cliente:", error);

        return {
            success: false,
            message: "Erro ao tentar remover o cliente",
        };
    }
}
