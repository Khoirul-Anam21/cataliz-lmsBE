export const getType = (mimeType: string): string => {
    if (mimeType.includes("video")) return "video";
    if (mimeType.includes("pdf")) return "reading";
    throw "Invalid File Type"
}