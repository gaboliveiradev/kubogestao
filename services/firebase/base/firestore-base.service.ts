import { db } from "@/lib/firebase";
import { Timestamp } from "firebase-admin/firestore";

export class FirestoreBaseService<T> {
    constructor(protected collectionName: string) { }

    protected collection() {
        return db.collection(this.collectionName);
    }

    async getById(id: string): Promise<T | null> {
        const snapshot = await this.collection().doc(id).get();
        if (!snapshot.exists) return null;

        return snapshot.data() as T;
    }

    async delete(id: string): Promise<void> {
        await this.collection().doc(id).delete();
    }

    async upsert(id: string | undefined, data: Partial<T>) {
        const ref = id ? this.collection().doc(id) : this.collection().doc();
        const now = Timestamp.now();

        await ref.set(
            {
                ...data,
                id: ref.id,
                updated_at: now,
                created_at: id ? undefined : now,
            },
            { merge: true }
        );

        return { id: ref.id };
    }
}
