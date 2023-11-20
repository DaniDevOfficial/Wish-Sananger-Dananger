import React, { useState } from 'react';
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
} from '@chakra-ui/react';
import { toast } from 'react-toastify';
import { push, ref, set } from 'firebase/database';
import { database } from '../firebase';

export function CreatePassword({ isOpen, onOpen, onClose, onCreatePassword }) {

    const [website, setWebsite] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');


    async function saveNewPassword() {
        if (!website && !username && !email && !password && !name) {
            console.log("At least one field must be filled to be saved");
            toast.error("At least one field must be filled to be saved", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
            });
            return;

        }

        try {
            const creatorID = sessionStorage.getItem("userID")
            console.log(creatorID)
            const passwordRef = ref(database, 'passwords');
            const newPasswordRef = push(passwordRef);

            const passwordData = {
                website: website,
                username: username,
                email: email,
                password: password,
                name: name,
                passwordID: newPasswordRef.key,
                creatorID: creatorID
            };

            set(newPasswordRef, passwordData);
            setWebsite("");
            setUsername("");
            setEmail("");
            setPassword("");
            setName("");
            toast.success("Created new Password")
            console.log('Created new Password');
            onCreatePassword();

        }
        catch (error) {
            console.error('Error Saving Password:', error);
        }
        onClose();
    }
    return (
        <>

            <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent p={4}>
                    <DrawerCloseButton />

                    <DrawerBody>
                        <Flex direction="column" justify="space-between" h="100%" w="80%">

                            <Slide in={isOpen} direction="right">
                                <DrawerHeader textAlign="center">Create Password</DrawerHeader>

                                <FormControl marginLeft="2vw" mb={4}>
                                    <FormLabel>Website</FormLabel>
                                    <Input
                                        placeholder="Enter website"
                                        value={website}
                                        onChange={(e) => setWebsite(e.target.value)}
                                    />
                                </FormControl>

                                <FormControl marginLeft="2vw" mb={4}>
                                    <FormLabel>Username</FormLabel>
                                    <Input
                                        placeholder="Enter username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </FormControl>

                                <FormControl marginLeft="2vw" mb={4}>
                                    <FormLabel>Email</FormLabel>
                                    <Input
                                        type="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </FormControl>

                                <FormControl marginLeft="2vw" mb={4}>
                                    <FormLabel>Password</FormLabel>
                                    <Input
                                        type="password"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />

                                </FormControl>
                                <FormControl marginLeft="2vw" mb={4}>
                                    <FormLabel>Name of the Password</FormLabel>
                                    <Input
                                        type="text"
                                        placeholder="Enter a Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />

                                </FormControl>

                                <Button colorScheme="teal" marginLeft="2vw" onClick={saveNewPassword}>
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
