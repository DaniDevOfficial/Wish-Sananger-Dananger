import { ref, get } from 'firebase/database';
import { database } from '../firebase';


export async function getAllData(path: string) {
  const dataRef = ref(database, path);

  try {
    const snapshot = await get(dataRef);
    return snapshot.val();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
export async function getUserByName(usernameToFind: string) {
    const dataRef = ref(database, 'users'); // Always use the path "users"
  
    try {
      const snapshot = await get(dataRef);
      const data = snapshot.val();
  
      if (data && typeof data === 'object') {
        const usersArray = Object.values(data);
  
        const user = usersArray.find((user) => user.username === usernameToFind);
  
        if (user) {
          return user;
        } else {
          console.error('User not found');
          return null;
        }
      } else {
        console.error('Invalid data format');
        return null;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }