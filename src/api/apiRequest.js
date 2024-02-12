import axios from "axios";
const VITE_API_KEY = import.meta.env.VITE_API_KEY;
const VITE_BASE_ID = import.meta.env.VITE_BASE_ID;

// GET list
export async function getListFromDatabase(tableName) {
  try {
    const response = await axios.get(
      `https://api.airtable.com/v0/${VITE_BASE_ID}/${tableName}`,
      {
        headers: {
          Authorization: `Bearer ${VITE_API_KEY}`,
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
      `https://api.airtable.com/v0/${VITE_BASE_ID}/${tableName}/${recordId}`,
      {
        headers: {
          Authorization: `Bearer ${VITE_API_KEY}`,
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
      `https://api.airtable.com/v0/${VITE_BASE_ID}/${tableName}/${recordId}`,
      {
        fields: data,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${VITE_API_KEY}`,
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
      `https://api.airtable.com/v0/${VITE_BASE_ID}/${tableName}`,
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
          Authorization: `Bearer ${VITE_API_KEY}`,
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
      `https://api.airtable.com/v0/${VITE_BASE_ID}/${tableName}/${recordId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${VITE_API_KEY}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error during DELETE request:", error);
    throw error;
  }
}
