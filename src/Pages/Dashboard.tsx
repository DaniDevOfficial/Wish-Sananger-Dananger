// Dashboard.jsx

import React, { useEffect, useState } from 'react';
import { Button, useDisclosure, Box, Text, VStack } from '@chakra-ui/react';
import { CreatePassword } from './CreatePassword';
import { getPasswordsWithCreatorID } from '../repo/repo';

export function Dashboard({ colorMode }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [passwords, setPasswords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPassword, setSelectedPassword] = useState(null);

    const userID = sessionStorage.getItem('userID');

    async function fetchPasswords() {
        try {
            const userPasswords = await getPasswordsWithCreatorID(userID);
            setPasswords(userPasswords);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchPasswords();
    }, [userID]);

    const handleCreatePassword = (password) => {
        if (selectedPassword) {
            console.log('Editing password:', password);
        } else {
            console.log('Creating password:', password);
        }

        onClose();
        fetchPasswords();
    };

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
