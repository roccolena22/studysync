import axios from "axios";
import { TabelName } from "../shared/models";

const VITE_API_KEY = import.meta.env.VITE_API_KEY;
const VITE_BASE_ID = import.meta.env.VITE_BASE_ID;

const airtableBaseUrl = `https://api.airtable.com/v0/${VITE_BASE_ID}`;


// GET paginated records
export async function getPaginatedUsers(limit: number = 15, offset?: string) {
  try {
    const url = `${airtableBaseUrl}/${TabelName.USERS}?pageSize=${limit}${
      offset ? `&offset=${offset}` : ""
    }`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${VITE_API_KEY}`,
      },
    });

    return {
      records: response.data.records.map((rec) => ({
        id: rec.id,
        ...rec.fields,
      })),
      offset: response.data.offset, // se presente, usarlo per caricare la prossima pagina
    };
  } catch (error) {
    console.error("Error during paginated GET request:", error.response || error);
    throw error;
  }
}


// GET single record
export async function getUser(recordId: string) {
  try {
    const response = await axios.get(
      `${airtableBaseUrl}/${TabelName.USERS}/${recordId}`,
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
export async function getUserByField(fieldName: string, value) {
  try {
    const response = await axios.get(
      `${airtableBaseUrl}/${TabelName.USERS}?filterByFormula=${encodeURIComponent(`{${fieldName}} = '${value}'`)}`,
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

// GET all records where linked field contains a specific record ID
export async function getUsersByLinkedField(
  fieldName: string,
  recordId: string
) {
  try {
    const filterFormula = `FIND("${recordId}", ARRAYJOIN({${fieldName}}))`;

    const response = await axios.get(
      `${airtableBaseUrl}/${TabelName.USERS}?filterByFormula=${encodeURIComponent(filterFormula)}`,
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
    console.error("Error during linked field GET request:", error.response || error);
    throw error;
  }
}


// GET records using a custom Airtable formula
export async function getUsersByFilter(formula: string) {
  try {
    const response = await axios.get(
      `${airtableBaseUrl}/${TabelName.USERS}?filterByFormula=${encodeURIComponent(formula)}`,
      {
        headers: {
          Authorization: `Bearer ${VITE_API_KEY}`,
        },
      }
    );

    return response.data.records.map((element) => ({
      id: element.id,
      ...element.fields,
    }));
  } catch (error) {
    console.error("Error during custom formula GET request:", error.response || error);
    throw error;
  }
}

// PATCH edit record
export async function updateUser(recordId: string, data) {
  try {
    const response = await axios.patch(
      `${airtableBaseUrl}/${TabelName.USERS}/${recordId}`,
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
export async function addUser(data) {
  try {
    const response = await axios.post(
      `${airtableBaseUrl}/${TabelName.USERS}`,
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
export async function deleteUser(recordId: string) {
  try {
    const response = await axios.delete(
      `${airtableBaseUrl}/${TabelName.USERS}/${recordId}`,
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
