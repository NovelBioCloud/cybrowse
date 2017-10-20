export function arrayify(obj: any) {
    if (Array.isArray(obj)) {
        return obj
    } else if (obj !== undefined) {
        return []
    } else {
        return [obj]
    }
}