'use server';

import { auth } from "@/lib/auth"; // ajuste conforme seu projeto
import { clientsService } from "@/services/firebase/clients/clients.service";

export async function getClientsCount() {
  const userLogged = await auth();

  if (!userLogged?.user?.id) return 0;

  return await clientsService.countClients(userLogged.user.id);
}
