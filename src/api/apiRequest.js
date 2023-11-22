const API_ENDPOINT =
  "https://v1.nocodeapi.com/mandrake5909/airtable/DjoNIrosOjSjolHS";
const API_KEY =
  "patwdAD7rzex8Ij5W.ce2b7b7b37bf5383da9e6cd10e22ad52deff5371fe8f754c078b23eb6751c077";

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
