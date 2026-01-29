export default async function imageURLToBase64(url: string): Promise<string> {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");

    const contentType =
        response.headers.get("content-type") ?? "image/png";

    return `data:${contentType};base64,${base64}`;
}