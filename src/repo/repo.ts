import { ref, get } from 'firebase/database';
import { database } from '../firebase';
import { User, Password } from './types';
import { decryptText } from './GlobalFunctions';

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

export async function getPasswordsWithCreatorID(creatorID: string , key: string ) {
  const dataRef = ref(database, "/passwords");
  try {
    const snapshot = await get(dataRef);
    const data = snapshot.val();

    if (data && typeof data === 'object') {
      const passwordArray = Object.values(data);

      const passwords = passwordArray
        .filter((password) => password.creatorID === creatorID)
        .map((password) => {
          return {
            ...password,
            email: decryptText(password.email, key),
            name: decryptText(password.name, key),
            password: decryptText(password.password, key),
            username: decryptText(password.username, key),
            website: decryptText(password.website, key),
          };
        });

      console.log(passwords);

      if (passwords.length > 0) {
        return passwords;
      } else {
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


export async function getPasswordByID(passwordID, key) {
  const dataRef = ref(database, "/passwords");
  try {
    const snapshot = await get(dataRef);
    const data = snapshot.val();

    if (data && typeof data === 'object') {
      const passwordArray = Object.values(data);

      const password = passwordArray.find((password) => password.passwordID === passwordID);

      if (password) {
        return {
          ...password,
          email: decryptText(password.email, key),
          name: decryptText(password.name, key),
          password: decryptText(password.password, key),
          username: decryptText(password.username, key),
          website: decryptText(password.website, key),
        };
      } else {
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