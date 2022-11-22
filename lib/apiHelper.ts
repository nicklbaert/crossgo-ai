async function doFetch<JSON = unknown>(input: string, options: any, callingLocalBackend?: boolean): Promise<JSON> {

    let url;

    if (input.includes('/api/') || input.includes('/backend/')) url = input;
    else url = new URL(input);

    console.log(`apiHelper: calling ${url.toString()}`);

    const response = await fetch(url.toString(), options);

    const data = await response.json();

    if (!data.error) {
        return data as JSON;
    }

    throw Error(data.data);
}

export async function authFetchJSON<JSON = unknown>(input: any, token: string, callingLocalBackend?: boolean): Promise<JSON> {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }

    return doFetch(input, options, callingLocalBackend);
}

export async function authDeleteJSON<JSON = unknown>(input: any, token: string, callingLocalBackend?: boolean): Promise<JSON> {
    const options = {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
    return doFetch(input, options, callingLocalBackend);
}

export async function authPostJSON<JSON = unknown>(input: any, token: string, body?: string, callingLocalBackend?: boolean): Promise<JSON> {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: body
    }
    return doFetch(input, options, callingLocalBackend);
}

export async function postJSON<JSON = unknown>(input: any, body?: string, callingLocalBackend?: boolean): Promise<JSON> {
    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body
    }
    return doFetch(input, options, callingLocalBackend);
}

export async function fetchJSON<JSON = unknown>(input: any, init?: any, callingLocalBackend?: boolean): Promise<JSON> {
    return doFetch(input, init, callingLocalBackend);
}