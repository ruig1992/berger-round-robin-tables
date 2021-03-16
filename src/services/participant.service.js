const PARTICIPANTS_STORAGE_KEY = 'participants';

export function getParticipants() {
    const data = localStorage.getItem(PARTICIPANTS_STORAGE_KEY);

    return data !== null ? JSON.parse(data) : [];
}

export function saveParticipants(data = []) {
    localStorage.setItem(PARTICIPANTS_STORAGE_KEY, JSON.stringify(data));
}
