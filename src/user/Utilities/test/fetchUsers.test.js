import { fetchUsers } from '../fetchFunctions';
import { getListFromDatabase } from '../../../api/apiRequest';
import { setUsers } from '../../../redux/slices/usersSlice';


// Mocka la funzione getListFromDatabase per controllare il suo comportamento nei test
jest.mock('../../../api/apiRequest.js', () => ({
    getListFromDatabase: jest.fn(),
  }));
  
  // Mocka la funzione dispatch per controllare il suo comportamento nei test
  jest.mock('../../../redux/slices/usersSlice.js', () => ({
    setUsers: jest.fn(),
  }));
  
    test('recupera e imposta gli utenti correttamente', async () => {
      const mockDispatch = jest.fn();
      const mockUsersFromDatabase = ['user1', 'user2'];
  
      // Simula il comportamento di getListFromDatabase
      getListFromDatabase.mockResolvedValue(mockUsersFromDatabase);
  
      // Esegui la funzione fetchUsers
      await fetchUsers(mockDispatch);
  
      // Verifica che getListFromDatabase sia stata chiamata
      expect(getListFromDatabase).toHaveBeenCalledWith('users');
  
      // Verifica che setUsers sia stata chiamata con i dati restituiti da getListFromDatabase
      expect(setUsers).toHaveBeenCalledWith(mockUsersFromDatabase);
  
      // Verifica che dispatch sia stata chiamata con l'azione giusta (setUsers)
      expect(mockDispatch).toHaveBeenCalledWith(setUsers(mockUsersFromDatabase));
    });
  