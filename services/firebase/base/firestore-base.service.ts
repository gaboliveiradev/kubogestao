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

        const payload: Partial<T> & {
            id: string;
            updated_at: Timestamp;
            created_at?: Timestamp;
        } = {
            ...data,
            id: ref.id,
            updated_at: now,
        };

        if (!id) {
            payload.created_at = now;
        }

        await ref.set(payload, { merge: true });

        return { id: ref.id };
    }
}
