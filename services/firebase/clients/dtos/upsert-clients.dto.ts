export interface UpsertClientDTO {
    id?: string;

    user_id: string;

    document: string;
    corporate_name: string;
    fantasy_name?: string;
    company_nickname?: string;
    responsible_name?: string;

    zipcode: string;
    address: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;

    customer_email?: string;
    billing_email?: string;

    customer_phone?: string;
    responsible_phone?: string;
    billing_phone?: string;
}
