import { ref, get } from 'firebase/database';
import { database } from '../firebase';
import { User, Password } from './types';


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

export async function getPasswordsWithCreatorID(creatorID: string) {
  const dataRef = ref(database, "/passwords");
  try {
    const snapshot = await get(dataRef);
    const data = snapshot.val();

    if (data && typeof data === 'object') {
      const passwordArray: {
        creatorID: string
      }[] = Object.values(data);

      const passwords: Password[] = passwordArray.filter((password) => password.creatorID === creatorID);
      console.log(passwords)
      if (passwords.length > 0) {
        return passwords;
        
      } else {
        // No users found with the given creatorID
        return [];
      }
    } else {
      console.error('Invalid data format');
      return [];
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}


export async function getPasswordByID(passwordID: string) {
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