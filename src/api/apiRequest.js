import axios from "axios";

const API_KEY =
  "patwdAD7rzex8Ij5W.e978b342ebe8655aea285c6274ea86e5da74275c89dd181db80680a23c470c2d";
const baseId = "appuffXtZ3FVbuxF4";

// GET list
export async function getListFromDatabase(tableName) {
  try {
    const response = await axios.get(
      `https://api.airtable.com/v0/${baseId}/${tableName}`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    const responseData = response.data;
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
    const response = await axios.get(
      `https://api.airtable.com/v0/${baseId}/${tableName}/${recordId}`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    return response.data.fields;
  } catch (error) {
    console.error("Error during GET request:", error);
    throw error;
  }
}

// PATCH edit record
export async function updateDatabaseRecord(tableName, recordId, data) {
  try {
    const response = await axios.patch(
      `https://api.airtable.com/v0/${baseId}/${tableName}/${recordId}`,
      {
        fields: data,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error during PATCH request:", error);
    throw error;
  }
}

// POST add record
export async function addRecordToDatabase(tableName, data) {
  try {
    const response = await axios.post(
      `https://api.airtable.com/v0/${baseId}/${tableName}`,
      {
        records: [
          {
            fields: data,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error during POST request:", error);
    throw error;
  }
}

//DELETE record
export async function deleteRecordFromDatabase(tableName, recordId) {
  try {
    const response = await axios.delete(
      `https://api.airtable.com/v0/${baseId}/${tableName}/${recordId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error during DELETE request:", error);
    throw error;
  }
}
