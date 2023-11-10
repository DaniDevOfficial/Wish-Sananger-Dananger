import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';

export function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // You can add your login logic here, e.g., sending a request to the server.

        // For now, let's just print the entered values to the console.
        console.log('Username:', username);
        console.log('Password:', password);
    };

    return (
        <Box
            mx="auto"
            mt="4"
            p="4"
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="md"
            bgColor={"grey"}
            maxWidth={"300px"}
        >
            <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </FormControl>

            <FormControl mt="4">
                <FormLabel>Password</FormLabel>
                <Input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </FormControl>

            <Button mt="4" colorScheme="teal" onClick={handleLogin}>
                Login
            </Button>
        </Box>
    );
}
