import axios from "axios";
import { TabelName } from "../shared/models";

const VITE_API_KEY = import.meta.env.VITE_API_KEY;
const VITE_BASE_ID = import.meta.env.VITE_BASE_ID;

const airtableBaseUrl = `https://api.airtable.com/v0/${VITE_BASE_ID}`;


// GET all records where linked field contains a specific record ID
export async function getFollowerRecordsByLinkedField(
  fieldName: string,
  recordId: string
) {
  try {
    const filterFormula = `FIND("${recordId}", ARRAYJOIN({${fieldName}}))`;

    const response = await axios.get(
      `${airtableBaseUrl}/${TabelName.FOLLOWERS}?filterByFormula=${encodeURIComponent(filterFormula)}`,
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


// POST add record
export async function addFollower(data) {
  try {
    const response = await axios.post(
      `${airtableBaseUrl}/${TabelName.FOLLOWERS}`,
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
export async function deleteFollower( recordId: string) {
  try {
    const response = await axios.delete(
      `${airtableBaseUrl}/${TabelName.FOLLOWERS}/${recordId}`,
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
