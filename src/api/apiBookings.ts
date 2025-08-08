import { TabelName } from "../shared/models";
import axios from "axios";

const VITE_API_KEY = import.meta.env.VITE_API_KEY;
const VITE_BASE_ID = import.meta.env.VITE_BASE_ID;

const airtableBaseUrl = `https://api.airtable.com/v0/${VITE_BASE_ID}`;


// GET records using a custom Airtable formula
export async function getBookingByFilter(
  formula: string
) {
  try {
    const response = await axios.get(
      `${airtableBaseUrl}/${TabelName.BOOKINGS}?filterByFormula=${encodeURIComponent(formula)}`,
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


// POST add record
export async function addBooking(data) {
  try {
    const response = await axios.post(
      `${airtableBaseUrl}/${TabelName.BOOKINGS}`,
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
export async function deleteBooking(recordId: string) {
  try {
    const response = await axios.delete(
      `${airtableBaseUrl}/${TabelName.BOOKINGS}/${recordId}`,
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
