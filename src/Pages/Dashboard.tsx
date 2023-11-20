import React, { useEffect, useState } from 'react';
import { Button, useDisclosure, Box, Text, HStack, VStack } from '@chakra-ui/react';
import { CreatePassword } from './CreatePassword';
import { getPasswordsWithCreatorID } from '../repo/repo';

export function Dashboard() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [passwords, setPasswords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const userID = sessionStorage.getItem('userID');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userPasswords = await getPasswordsWithCreatorID(userID);
                setPasswords(userPasswords);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userID]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }
    const handleCreatePassword = async () => {
        await fetchData();
    };
    const renderFieldVStack = (label, value, fontSize = 'md', fontWeight = 'normal') => (
        <VStack align="start" spacing={1} color="gray.500">
            <Text fontSize="lg" fontWeight="bold">{label}:</Text>
            <Text fontSize={fontSize} fontWeight={fontWeight}>{value || 'N/A'}</Text>
        </VStack>
    );

    return (
        <>
            <Button onClick={onOpen}>Open CreatePassword</Button>
            <CreatePassword isOpen={isOpen} onOpen={onOpen} onClose={onClose} onCreatePassword={handleCreatePassword} />

            {passwords.map((password) => (
                <Box key={password.passwordID} bg="white" p={4} borderRadius="md" boxShadow="md" mb={4}>
                    {password.name}
                    <HStack spacing={4}>
                        {renderFieldVStack('Email', password.email)}
                        {renderFieldVStack('Username', password.username)}
                        {renderFieldVStack('Password', password.password)}
                        {renderFieldVStack('Website', password.website, 'sm', 'bold')}

                        {/* Add more fields as needed */}
                    </HStack>
                </Box>
            ))}
        </>
    );
}
