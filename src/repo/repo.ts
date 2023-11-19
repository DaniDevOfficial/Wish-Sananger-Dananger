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
        console.log(user)
        if (user) {
          return user;
        } else {
          // user doesnt exist (no console log for safety)
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

  export async function getPasswordsWithUserID(userID: string){
    const dataRef = ref(database, "/passwords");
    try {
      const snapshot = await get(dataRef);
      const data = snapshot.val();
  

      if (data && typeof data === 'object') {
        const passwordArray: { userID: string }[] = Object.values(data);

        const user: User | undefined = passwordArray.find((passwords) => passwords.userID === userID);

        if (user) {
          return user;
        } else {
          // user doesnt exist (no console log for safety)
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

  
  export async function getPasswordByID(passwordID: string){
    const dataRef = ref(database, "/passwords");
    try {
      const snapshot = await get(dataRef);
      const data = snapshot.val();
  

      if (data && typeof data === 'object') {
        const passwordArray: { passwordID: string }[] = Object.values(data);

        const user: User | undefined = passwordArray.find((passwords) => passwords.passwordID === passwordID);

        if (user) {
          return user;
        } else {
          // user doesnt exist (no console log for safety)
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