const API_BASE_URL = process.env.VUE_APP_API_BASE_URL || null;
const PARTICIPANTS_STORAGE_KEY = 'app_participants';

async function postData(url = '', body = {}) {
    const response = await fetch(url, {
        method: 'POST',
        cache: 'no-cache',
        body: JSON.stringify(body),
    });
    return await response.json();
}

export async function getParticipants(tournamentName) {
    if (!API_BASE_URL) {
        return getParticipantsFromLocalStorage(tournamentName);
    }
    const response = await fetch(`${API_BASE_URL}getjson?filename=${tournamentName}`);
    const data = await response.json();

    return data !== null ? data : [];
}

export async function saveParticipants(tournamentName, data = []) {
    if (!API_BASE_URL) {
        return saveParticipantsToLocalStorage(tournamentName, data);
    }
    const result = await postData(`${API_BASE_URL}savejson`, {
        data,
        filename: tournamentName,
    });
    return result.status || false;
}

export function getParticipantsFromLocalStorage(tournamentName) {
    const data = localStorage.getItem(`${PARTICIPANTS_STORAGE_KEY}_${tournamentName}`);
    return data !== null ? JSON.parse(data) : [];
}

export function saveParticipantsToLocalStorage(tournamentName, data = []) {
    localStorage.setItem(`${PARTICIPANTS_STORAGE_KEY}_${tournamentName}`, JSON.stringify(data));
    return true;
}
