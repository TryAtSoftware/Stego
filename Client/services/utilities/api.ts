export function withQuery(baseUrl: string, ...querySegments: [string, string][]): string {
    const query = querySegments
        .filter((x): boolean => !!x && !!x[0] && !!x[1])
        .map(([key, value]): string => `${key}=${value}`)
        .join('&');
    return `${baseUrl}?${query}`;
}

export function buildFileUrl(fileId: string | undefined): string {
    if (!fileId) return "";
    return `/api/file/${fileId}`;
}