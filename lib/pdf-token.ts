import jwt from "jsonwebtoken";

export function generatePdfToken(budgetId: string, userId: string) {
    return jwt.sign(
        { budgetId, userId },
        process.env.PDF_SECRET!,
        { expiresIn: "5m" }
    );
}
