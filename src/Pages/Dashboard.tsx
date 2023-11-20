import React, { useEffect, useState } from 'react'
import { CreatePassword } from './CreatePassword'
import { Button, useDisclosure } from '@chakra-ui/react';
import { getPasswordsWithCreatorID } from '../repo/repo';

export function Dashboard() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [passwords, setPasswords] = useState([]);



        const userID = sessionStorage.getItem("userID");
        console.log(userID)
        async function verify() {

            try {
                const passwords = await getPasswordsWithCreatorID("-NjcLeFq08xkbbvcufen");
                console.log(passwords)
              
                }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        console.log
           
          

          
    return (
        <>
            <Button onClick={onOpen}>Open CreatePassword</Button>
            <Button onClick={verify}>wasd</Button>
            <CreatePassword isOpen={isOpen} onOpen={onOpen} onClose={onClose} />


        </>
    )
}