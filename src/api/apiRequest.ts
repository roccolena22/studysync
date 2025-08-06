import axios from "axios";
import { TabelName } from "../shared/models";

const VITE_API_KEY = import.meta.env.VITE_API_KEY;
const VITE_BASE_ID = import.meta.env.VITE_BASE_ID;

const airtableBaseUrl = `https://api.airtable.com/v0/${VITE_BASE_ID}`;

// GET list
export async function getListFromDatabase(tableName : TabelName) {
  try {
    const response = await axios.get(
      `${airtableBaseUrl}/${tableName}`,
      {
        headers: {
          Authorization: `Bearer ${VITE_API_KEY}`,
        },
      }
    );

    const responseData = response.data;
    return responseData.records.map((element) => ({
      id: element.id,
      ...element.fields,
    }));
  } catch (error) {
    console.error("Error during GET request:", error.response || error);
    throw error;
  }
}

// GET single record
export async function getRecordFromDatabase(tableName : TabelName, recordId) {
  try {
    const response = await axios.get(
      `${airtableBaseUrl}/${tableName}/${recordId}`,
      {
        headers: {
          Authorization: `Bearer ${VITE_API_KEY}`,
        },
      }
    );

    return response.data.fields;
  } catch (error) {
    console.error("Error during GET request:", error.response || error);
    throw error;
  }
}

// GET filtered record by field
export async function getRecordByField(tableName : TabelName, fieldName, value) {
  try {
    const response = await axios.get(
      `${airtableBaseUrl}/${tableName}?filterByFormula=${encodeURIComponent(`{${fieldName}} = '${value}'`)}`,
      {
        headers: {
          Authorization: `Bearer ${VITE_API_KEY}`,
        },
      }
    );

    const records = response.data.records;
    if (records.length > 0) {
      return {
        id: records[0].id,
        ...records[0].fields,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error during filtered GET request:", error.response || error);
    throw error;
  }
}

// PATCH edit record
export async function updateDatabaseRecord(tableName : TabelName, recordId, data) {
  try {
    const response = await axios.patch(
      `${airtableBaseUrl}/${tableName}/${recordId}`,
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
    console.error("Error during PATCH request:", error.response || error);
    throw error;
  }
}

// POST add record
export async function addRecordToDatabase(tableName : TabelName, data) {
  try {
    const response = await axios.post(
      `${airtableBaseUrl}/${tableName}`,
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
    console.error("Error during POST request:", error.response || error);
    throw error;
  }
}

// DELETE record
export async function deleteRecordFromDatabase(tableName : TabelName, recordId) {
  try {
    const response = await axios.delete(
      `${airtableBaseUrl}/${tableName}/${recordId}`,
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
    console.error("Error during DELETE request:", error.response || error);
    throw error;
  }
}
