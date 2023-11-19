const API_ENDPOINT = "https://v1.nocodeapi.com/roccolena/airtable/gpChlrmCvOIlPumv";
const API_KEY = "patNnytdYu13u73Ht.8abd11bf543cf2bd3f773b5e3f96b2f7ff7976426d980cfbdb44a3cc9a8bcf1b";

// GET
export async function fetchData(tableName) {
    try {
      const url = `${API_ENDPOINT}?tableName=${tableName}`;
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      });
  
      const data = await response.json();
      return data.records
    } catch (error) {
      console.error(`Errore durante la richiesta GET dalla tabella ${tableName}:`, error);
    }
}

// PUT
export async function updateData(tableName, updatedFields) {
  try {
    const response = await fetch(`${API_ENDPOINT}/${tableName}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        records: [
          {
            fields: updatedFields,
          },
        ],
      }),
    });

    const data = await response.json();
    return data.records

  } catch (error) {
    console.error(`Errore durante la richiesta PUT nella tabella ${tableName}:`, error);
  }
}

// POST
export async function createData(tableName, newFields) {
  try {
    const response = await fetch(`${API_ENDPOINT}/${tableName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        records: [
          {
            fields: newFields,
          },
        ],
      }),
    });

    const data = await response.json();
    return data.records

  } catch (error) {
    console.error(`Errore durante la richiesta POST nella tabella ${tableName}:`, error);
  }
}
