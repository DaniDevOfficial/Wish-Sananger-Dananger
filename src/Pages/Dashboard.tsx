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
        // Handle the creation or editing logic here
        // You can check if `selectedPassword` is not null to determine if it's an edit
        if (selectedPassword) {
            // Handle edit logic
            console.log('Editing password:', password);
        } else {
            // Handle create logic
            console.log('Creating password:', password);
        }

        // Close the modal
        onClose();
        // Refresh the passwords
        fetchPasswords();
    };

    const handleEditPassword = (password) => {
        // Set the selected password for editing
        setSelectedPassword(password);
        // Open the modal for editing
        onOpen();
    };

    const handleCreateNewPassword = () => {
        // Set the selected password to null to indicate it's a new password
        setSelectedPassword(null);
        // Open the modal for creating a new password
        onOpen();
    };

    return (
        <>
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
                    onClick={() => handleEditPassword(password)} // Handle click to edit
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
        </>
    );
}
