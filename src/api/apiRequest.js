const API_KEY =
  "patwdAD7rzex8Ij5W.e978b342ebe8655aea285c6274ea86e5da74275c89dd181db80680a23c470c2d";
const baseId = "appuffXtZ3FVbuxF4";

// GET
export async function getListFromDatabase(tableName) {
  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${baseId}/${tableName}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    const responseData = await response.json();
    const dataFromDatabase = responseData.records.map((element) => ({
      ...element.fields,
    }));
    return dataFromDatabase;
  } catch (error) {
    console.error("Error during GET request:", error);
    throw error;
  }
}

//GET signle record
export async function getRecordFromDatabase(tableName, recordId) {
  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${baseId}/${tableName}/${recordId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    const responseData = await response.json();
  
    return responseData.fields;
  } catch (error) {
    console.error("Error during GET request:", error);
    throw error;
  }
}

// PATCH
export async function updateDatabaseRecord(tableName, recordId, data) {
  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${baseId}/${tableName}/${recordId}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          fields: data,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error during PATCH request:", error);
    throw error;
  }
}

// POST
export async function addToDatabase(tableName, data) {
  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${baseId}/${tableName}`,
      {
        method: "POST",
        body: JSON.stringify({
          records: [
            {
              fields: data,
            },
          ],
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("error during POST request:", error);
    throw error;
  }
}

//DELETE

export async function deleteFromDatabase(tableName, recordId) {
  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${baseId}/${tableName}/${recordId}`,
      {
        method: "delete",
        body: JSON.stringify({
          id: recordId,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("error during Delete request:", error);
    throw error;
  }
}
