import axios from "axios";
import { TabelName } from "../shared/models";

const VITE_API_KEY = import.meta.env.VITE_API_KEY;
const VITE_BASE_ID = import.meta.env.VITE_BASE_ID;

const airtableBaseUrl = `https://api.airtable.com/v0/${VITE_BASE_ID}`;

// ✅ Normalizza i campi che Airtable restituisce come array, ma sono sempre singoli
function normalizeFields(fields: Record<string, any>) {
  const singleValueFields = ["firstName", "lastName", "email", "role", "authorId"];
  const normalized: Record<string, any> = {};

  for (const key in fields) {
    const value = fields[key];
    normalized[key] = singleValueFields.includes(key) && Array.isArray(value)
      ? value[0]
      : value;
  }

  return normalized;
}

// ✅ GET Event list
export async function getEventsList() {
  try {
    const response = await axios.get(`${airtableBaseUrl}/${TabelName.EVENTS}`, {
      headers: {
        Authorization: `Bearer ${VITE_API_KEY}`,
      },
    });

    const responseData = response.data;

    return responseData.records.map((element) => ({
      id: element.id,
      ...normalizeFields(element.fields),
    }));
  } catch (error) {
    console.error("Error during GET request:", error.response || error);
    throw error;
  }
}

// ✅ GET single Event record
export async function getEventRecord(recordId: string) {
  try {
    const response = await axios.get(
      `${airtableBaseUrl}/${TabelName.EVENTS}/${recordId}`,
      {
        headers: {
          Authorization: `Bearer ${VITE_API_KEY}`,
        },
      }
    );

    return normalizeFields(response.data.fields);
  } catch (error) {
    console.error("Error during GET request:", error.response || error);
    throw error;
  }
}

// ✅ GET filtered Event record by field
export async function getEventRecordByField(fieldName: string, value: string) {
  try {
    const response = await axios.get(
      `${airtableBaseUrl}/${TabelName.EVENTS}?filterByFormula=${encodeURIComponent(`{${fieldName}} = '${value}'`)}`,
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
        ...normalizeFields(records[0].fields),
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error during filtered GET request:", error.response || error);
    throw error;
  }
}

// ✅ GET all Event records where linked field contains a specific record ID
export async function getEventRecordsByLinkedField(
  fieldName: string,
  recordId: string
) {
  try {
    const filterFormula = `FIND("${recordId}", ARRAYJOIN({${fieldName}}))`;

    const response = await axios.get(
      `${airtableBaseUrl}/${TabelName.EVENTS}?filterByFormula=${encodeURIComponent(filterFormula)}`,
      {
        headers: {
          Authorization: `Bearer ${VITE_API_KEY}`,
        },
      }
    );

    const responseData = response.data;
    return responseData.records.map((element) => ({
      id: element.id,
      ...normalizeFields(element.fields),
    }));
  } catch (error) {
    console.error("Error during linked field GET request:", error.response || error);
    throw error;
  }
}

// ✅ GET Event records using a custom Airtable formula
export async function getEventRecordsByFilter(formula: string) {
  try {
    const response = await axios.get(
      `${airtableBaseUrl}/${TabelName.EVENTS}?filterByFormula=${encodeURIComponent(formula)}`,
      {
        headers: {
          Authorization: `Bearer ${VITE_API_KEY}`,
        },
      }
    );

    return response.data.records.map((element) => ({
      id: element.id,
      ...normalizeFields(element.fields),
    }));
  } catch (error) {
    console.error("Error during custom formula GET request:", error.response || error);
    throw error;
  }
}

// ✅ PATCH edit Event record
export async function updateEventRecord(recordId: string, data: Record<string, any>) {
  try {
    const response = await axios.patch(
      `${airtableBaseUrl}/${TabelName.EVENTS}/${recordId}`,
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

// ✅ POST add Event record
export async function addEventRecord(data: Record<string, any>) {
  try {
    const response = await axios.post(
      `${airtableBaseUrl}/${TabelName.EVENTS}`,
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

// ✅ DELETE Event record
export async function deleteEventRecord(recordId: string) {
  try {
    const response = await axios.delete(
      `${airtableBaseUrl}/${TabelName.EVENTS}/${recordId}`,
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
