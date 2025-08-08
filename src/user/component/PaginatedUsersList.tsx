import React, { useState } from "react";
import { User } from "../models";
import { getPaginatedUsers } from "../../api/apiUsers";
import PaginationControls from "./PaginationControls";
import UsersList from "./user/UserList";


export function PaginatedUsersList({ loggedUserId }: { loggedUserId: string }): JSX.Element {
  const [users, setUsers] = React.useState<User[]>([]);
  const [offset, setOffset] = React.useState<string | undefined>(undefined);
  const [offsetHistory, setOffsetHistory] = React.useState<(string | undefined)[]>([undefined]); // pagina 1
  const [pageIndex, setPageIndex] = React.useState(1);
  const [loading, setLoading] = React.useState(false);

  const fetchUsers = async (newOffset?: string) => {
    setLoading(true);
    try {
      const { records, offset: nextOffset } = await getPaginatedUsers(15, newOffset);

      // escludo utente loggato
      const filteredRecords = records.filter((u) => u.id !== loggedUserId);
      setUsers(filteredRecords);

      // salvo offset della prossima pagina
      setOffset(nextOffset);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const goNext = () => {
    if (!offset) return; // se non c'è offset, siamo all'ultima pagina
    setOffsetHistory((prev) => [...prev, offset]); // salvo la posizione corrente nella history
    setPageIndex((prev) => prev + 1);
    fetchUsers(offset);
  };

  const goPrev = () => {
    if (offsetHistory.length <= 1) return; // siamo già alla prima pagina
    const newHistory = [...offsetHistory];
    newHistory.pop(); // rimuovo pagina corrente
    const prevOffset = newHistory[newHistory.length - 1]; // prendo offset della pagina precedente
    setOffsetHistory(newHistory);
    setPageIndex((prev) => prev - 1);
    fetchUsers(prevOffset);
  };

  React.useEffect(() => {
    fetchUsers(); // carica pagina 1
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <>
          <UsersList usersToShow={users} />

            <PaginationControls
              onPrev={goPrev}
              onNext={goNext}
              pageIndex={pageIndex}
              canNext={!!offset}
            />
        </>
      )}
    </div>
  );
}