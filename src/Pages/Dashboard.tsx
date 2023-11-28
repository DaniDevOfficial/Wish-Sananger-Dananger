// Dashboard.jsx

import React, { useEffect, useState } from 'react';
import { Button, useDisclosure, Box, Text, VStack, HStack } from '@chakra-ui/react';
import { CreatePassword } from './CreatePassword';
import { getPasswordsWithCreatorID } from '../repo/repo';
import { Link, useNavigate } from 'react-router-dom';

export function Dashboard({ colorMode }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [passwords, setPasswords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPassword, setSelectedPassword] = useState(null);
    const navigate = useNavigate();
    const userID = sessionStorage.getItem('userID');
    const key = sessionStorage.getItem('key')
    const username = sessionStorage.getItem('username')
    async function fetchPasswords() {
        try {
            const userPasswords = await getPasswordsWithCreatorID(userID, key);
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

    const handleAccountButtonClick = () => {
        navigate('/account');
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
            <HStack spacing={4} justifyContent="space-between" width="100%">
                <Button flex="1" onClick={handleCreateNewPassword}>
                    Create New Password
                </Button>

                <Button onClick={handleAccountButtonClick} flexShrink={0}>
                    <HStack spacing={2}>
                        <Text>Hey, {username}</Text>
                        <Box w={6} h={6} borderRadius="full" bg="gray.300" />
                    </HStack>
                </Button>
            </HStack>
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
