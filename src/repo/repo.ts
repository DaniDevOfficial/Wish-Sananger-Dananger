import { ref, get } from 'firebase/database';
import { database } from '../firebase';
import { User } from '../types';


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
    const dataRef = ref(database, 'users');
  
    try {
      const snapshot = await get(dataRef);
      const data = snapshot.val();
  

      if (data && typeof data === 'object') {
        const usersArray: { username: string }[] = Object.values(data);

        const user: User | undefined = usersArray.find((user) => user.username === usernameToFind);

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