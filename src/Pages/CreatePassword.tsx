// CreatePassword.jsx

import React, { useState, useEffect } from 'react';
import {
    Flex,
    FormControl,
    FormLabel,
    Input,
    Slide,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    Button,
    InputGroup,
    IconButton,
    InputRightElement,
} from '@chakra-ui/react';
import { toast } from 'react-toastify';
import { ref, set, push } from 'firebase/database';
import { database } from '../firebase';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export function CreatePassword({ isOpen, onOpen, onClose, onCreatePassword, selectedPassword }) {
    const [website, setWebsite] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (selectedPassword) {
            setWebsite(selectedPassword.website || '');
            setUsername(selectedPassword.username || '');
            setEmail(selectedPassword.email || '');
            setPassword(selectedPassword.password || '');
            setName(selectedPassword.name || '');
        } else {
            setWebsite('');
            setUsername('');
            setEmail('');
            setPassword('');
            setName('');
        }
    }, [selectedPassword]);

    async function savePassword() {
        if (!website && !username && !email && !password && !name) {
            toast.error('At least one field must be filled to be saved', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
            });
            return;
        }

        try {
            const creatorID = sessionStorage.getItem('userID');
            let passwordRef;

            if (selectedPassword) {
                passwordRef = ref(database, `passwords/${selectedPassword.passwordID}`);
            } else {
                passwordRef = push(ref(database, 'passwords'));
            }

            set(passwordRef, {
                website: website,
                username: username,
                email: email,
                password: password,
                name: name,
                passwordID: selectedPassword ? selectedPassword.passwordID : passwordRef.key,
                creatorID: creatorID,
            });

            toast.success(selectedPassword ? 'Password Updated' : 'Created new Password', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
            });
            onCreatePassword();
        } catch (error) {
            console.error('Error Saving Password:', error);
        }

        onClose();
    }

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };
    useEffect(() => {
        if (!isOpen) {
            setShowPassword(false);
        }
    }, [isOpen]);
    return (
        <>
            <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent p={4}>
                    <DrawerCloseButton />

                    <DrawerBody>
                        <Flex direction="column" justify="space-between" h="100%" w="10%" >

                            <Slide in={isOpen} direction="right">
                                <DrawerHeader textAlign="center">
                                    {selectedPassword ? 'Edit Password' : 'Create Password'}
                                </DrawerHeader>
                                <FormControl marginLeft="2vw" paddingRight="5vw" mb={4}>
                                    <FormLabel>Website</FormLabel>
                                    <Input
                                        placeholder="Enter website"
                                        value={website}
                                        onChange={(e) => setWebsite(e.target.value)}
                                    />
                                </FormControl>

                                <FormControl marginLeft="2vw" paddingRight="5vw" mb={4}>
                                    <FormLabel>Username</FormLabel>
                                    <Input
                                        placeholder="Enter username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </FormControl>

                                <FormControl marginLeft="2vw" paddingRight="5vw" mb={4}>
                                    <FormLabel>Email</FormLabel>
                                    <Input
                                        type="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </FormControl>

                                <FormControl marginLeft="2vw" paddingRight="5vw" mb={4}>
                                    <FormLabel>Password</FormLabel>
                                    <InputGroup>
                                        <Input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Enter password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <InputRightElement>
                                            <IconButton
                                                variant="ghost"
                                                aria-label={showPassword ? 'Hide Password' : 'Show Password'}
                                                icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                                                onClick={handleTogglePassword}
                                            />
                                        </InputRightElement>
                                    </InputGroup>
                                </FormControl>

                                <FormControl marginLeft="2vw" paddingRight="5vw" mb={4}>
                                    <FormLabel>Name of the Password</FormLabel>
                                    <Input
                                        type="text"
                                        placeholder="Enter a Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </FormControl>

                                <Button colorScheme="teal" marginLeft="2vw" onClick={savePassword}>
                                    Save
                                </Button>
                            </Slide>
                        </Flex>

                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
}
