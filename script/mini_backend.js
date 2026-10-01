// Hinweis: Das urspruengliche Backend (als Vorlage uebernommen, nicht selbst geschrieben) ist nicht mehr erreichbar.
// Diese Datei spricht stattdessen gegen ein eigenes Supabase-Projekt, behaelt aber dieselbe
// backend.setItem/getItem/deleteItem-Schnittstelle bei, damit der restliche App-Code unveraendert bleibt.

const SUPABASE_URL = 'https://fmbyewfmrdsvxikahlqu.supabase.co';
const SUPABASE_KEY = 'sb_publishable_xRS99mj-aXimBtZ5A7NJ8A_1rvVYvVT';

let jsonFromServer = {};

const backend = {
    setItem: function(key, item) {
        jsonFromServer[key] = item;
        return saveJSONToServer();
    },
    getItem: function(key) {
        if (!jsonFromServer[key]) {
            return null;
        }
        return jsonFromServer[key];
    },
    deleteItem: function(key) {
        delete jsonFromServer[key];
        return saveJSONToServer();
    }
};

window.onload = async function() {
    downloadFromServer();
}

async function downloadFromServer() {
    let response = await fetch(SUPABASE_URL + '/rest/v1/app_state?id=eq.1&select=data', {
        headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': 'Bearer ' + SUPABASE_KEY
        }
    });
    let rows = await response.json();
    jsonFromServer = (rows[0] && rows[0].data) || {};
}

function saveJSONToServer() {
    return fetch(SUPABASE_URL + '/rest/v1/app_state?id=eq.1', {
        method: 'PATCH',
        headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': 'Bearer ' + SUPABASE_KEY,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: jsonFromServer })
    });
}
