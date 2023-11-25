// Dashboard.jsx

import React, { useEffect, useState } from 'react';
import { Button, useDisclosure, Box, Text, VStack } from '@chakra-ui/react';
import { CreatePassword } from './CreatePassword';
import { getPasswordsWithCreatorID } from '../repo/repo';
import { encryptText, decryptText } from '../repo/GlobalFunctions';

export function Dashboard({ colorMode }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [passwords, setPasswords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPassword, setSelectedPassword] = useState(null);

    const userID = sessionStorage.getItem('userID');

    const handleCreatePassword = async (password) => {
        const encryptedPassword = encryptText(password.password, password);

        if (selectedPassword) {
            console.log('Editing password:', encryptedPassword);
        } else {
            console.log('Creating password:', encryptedPassword);
        }

        onClose();
        fetchPasswords();
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userPasswords = await getPasswordsWithCreatorID(userID);

                const decryptedPasswords = userPasswords.map((password) => ({
                    ...password,
                    password: decryptText(password.password, 'your-secret-key'),
                }));

                setPasswords(decryptedPasswords);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userID]);

    const handleEditPassword = (password) => {
        setSelectedPassword(password);
        onOpen();
    };

    const handleCreateNewPassword = () => {
        setSelectedPassword(null);
        onOpen();
    };

    return (
        <VStack align="stretch" spacing={4} p={4}>
            <Button onClick={handleCreateNewPassword}>Create New Password</Button>
            <CreatePassword
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                onCreatePassword={handleCreatePassword}
                selectedPassword={selectedPassword}
            />

            {passwords.map((password) => (
                <Box
                    key={password.passwordID}
                    bg={colorMode === 'light' ? 'gray.200' : 'gray.600'}
                    p={4}
                    borderRadius="md"
                    boxShadow="md"
                    mb={4}
                    onClick={() => handleEditPassword(password)}
                >
                    <Text fontSize="xl" fontWeight="bold">
                        {password.name}
                    </Text>
                    {password.email && (
                        <Text fontSize="md" fontWeight="normal">
                            Email: {password.email}
                        </Text>
                    )}
                    {!password.email && password.username && (
                        <Text fontSize="md" fontWeight="normal">
                            Username: {password.username}
                        </Text>
                    )}
                </Box>
            ))}
        </VStack>
    );
}
