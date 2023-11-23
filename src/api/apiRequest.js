const API_ENDPOINT =
  "https://v1.nocodeapi.com/mandrake12/airtable/YQDjGspMzcoXkZPy";
const API_KEY =
  "patQz12Av7EmzJRWU.b544a64f797ff19ca614ac314bfcc0bcf483150e7895402e2e7d55d7e6810088";

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

// PUT
export async function updateDatabaseRecord(tableName, recordId, data) {
  try {
    const response = await fetch(`${API_ENDPOINT}?tableName=${tableName}`, {
      method: "PUT",
      body: JSON.stringify([
        {
          "id": recordId,
         "fields": data,
        },
      ]),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error during PUT request:", error);
    throw error;
  }
}
