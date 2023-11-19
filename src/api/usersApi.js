const API_ENDPOINT = "https://v1.nocodeapi.com/roccolena/airtable/gpChlrmCvOIlPumv";
const API_KEY = "patNnytdYu13u73Ht.8abd11bf543cf2bd3f773b5e3f96b2f7ff7976426d980cfbdb44a3cc9a8bcf1b";

export async function addToDatabase(tableName, data) {

let response = await fetch(`${API_ENDPOINT}?tableName=${tableName}`, {
method: 'POST',
body: JSON.stringify(data),
headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    'Authorization': `Bearer ${API_KEY}`,
}, 
});
console.log(await response.json());
}
