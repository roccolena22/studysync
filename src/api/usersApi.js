const API_ENDPOINT =
  "https://v1.nocodeapi.com/roccolena/airtable/gpChlrmCvOIlPumv";
const API_KEY =
  "patNnytdYu13u73Ht.8abd11bf543cf2bd3f773b5e3f96b2f7ff7976426d980cfbdb44a3cc9a8bcf1b";

// POST
export async function addToDatabase(tableName, data) {
  try {
    const response = await fetch(`${API_ENDPOINT}?tableName=${tableName}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("error during POST request:", error);
    throw error;
  }
}

// GET
export async function getFromDatabase(tableName) {
  try {
    const response = await fetch(`${API_ENDPOINT}?tableName=${tableName}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    const responseData = await response.json();
    return responseData.records;
  } catch (error) {
    console.error("Error during GET request:", error);
    throw error;
  }
}
