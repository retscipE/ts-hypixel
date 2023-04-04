import { fetchJson } from "fetch-json";

export async function request(url: string) {
    return await fetchJson.get(url)
}

export function timeConverter(UNIX_timestamp: number){
    const date = new Date(UNIX_timestamp).toDateString(),
        time = new Date(UNIX_timestamp).toTimeString();
    return date + ' ' + time
}