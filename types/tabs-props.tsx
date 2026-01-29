/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent } from "react";

export type TabProps = {
    values: Record<string, any>;
    errors: Record<string, string>;
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | { name: string; value: any }) => void;
}