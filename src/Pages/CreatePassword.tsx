// CreatePassword.jsx

import React, { useState, useEffect, useRef } from 'react';
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
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay
} from '@chakra-ui/react';
import { toast } from 'react-toastify';
import { ref, set, push } from 'firebase/database';
import { database } from '../firebase';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from "react-router-dom"
import { MdRefresh, MdDelete } from 'react-icons/md';


export function CreatePassword({ isOpen, onOpen, onClose, onCreatePassword, selectedPassword }) {
    const [website, setWebsite] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordLength, setPasswordLength] = useState(12);
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

    const onDeleteAlertOpen = () => setIsDeleteAlertOpen(true);
    const onDeleteAlertClose = () => setIsDeleteAlertOpen(false);
    const cancelRef = useRef();
    const navigate = useNavigate();

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
            if (!creatorID) {
                toast.error('You have to be logged in', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                });
                navigate('/');
                return;
            }
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

    let i: number = 0
    async function deletePassword() {
        if (i < 1) {
            toast.warning("Are you sure you want to delete this password? Click again to confirm.")
            i++
            return
        }
        try {
            const passwordRef = ref(database, `passwords/${selectedPassword.passwordID}`);
            await set(passwordRef, null);

            toast.success('Password Deleted', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
            });

            onCreatePassword();
            onClose();
        } catch (error) {
            console.error('Error Deleting Password:', error);
        }
    }




    const generatePassword = () => {
        const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
        const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numberChars = '0123456789';
        const specialChars = '!@#$%^&*()_-+=<>?';

        const getRandomChar = (charset) => {
            const randomIndex = Math.floor(Math.random() * charset.length);
            return charset[randomIndex];
        };

        let password =
            getRandomChar(lowercaseChars) +
            getRandomChar(uppercaseChars) +
            getRandomChar(numberChars) +
            getRandomChar(specialChars);

        for (let i = 4; i < passwordLength; i++) {
            const randomCharset =
                i % 3 === 0 ? lowercaseChars : i % 3 === 1 ? uppercaseChars : numberChars;
            password += getRandomChar(randomCharset);
        }

        setPassword(password);
    };




    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };
    useEffect(() => {
        if (!isOpen) {
            setShowPassword(false);
            i = 0
        }
    }, [isOpen]);

    useEffect(() => {
        const userID = sessionStorage.getItem('userID');
        if (!userID) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <>
            <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent p={4} overflowY="auto" >
                    <DrawerCloseButton />

                    <DrawerBody >
                        <Flex direction="column" justify="space-between" >

                            <Slide in={isOpen} direction="right" >
                                <DrawerHeader textAlign="center">
                                    {selectedPassword ? 'Edit Password' : 'Create Password'}
                                </DrawerHeader>
                                <FormControl marginLeft="2vw" paddingRight="5vw" mb={4}>
                                    <FormLabel>Name of the Password</FormLabel>
                                    <Input
                                        type="text"
                                        placeholder="Enter a Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </FormControl>
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
                                    <Slider
                                        aria-label="Password Length"
                                        mt={2}
                                        min={6}
                                        max={32}
                                        step={1}
                                        value={passwordLength}
                                        onChange={(value) => setPasswordLength(value)}
                                    >
                                        <SliderTrack />
                                        <SliderFilledTrack />
                                        <SliderThumb color="black" fontSize="sm" boxSize={5} zIndex={1}>
                                            {passwordLength}
                                        </SliderThumb>
                                    </Slider>

                                    <Button
                                        variant="outline"
                                        colorScheme="teal"
                                        size="sm"
                                        onClick={generatePassword}
                                        mt={2}
                                    >
                                        <MdRefresh /> Generate Password
                                    </Button>
                                </FormControl>



                                <Button colorScheme="teal" marginLeft="2vw" onClick={savePassword}>
                                    Save
                                </Button>

                                <Button
                                    colorScheme="red"
                                    marginLeft="2vw"
                                    onClick={deletePassword}
                                    isDisabled={!selectedPassword}
                                >
                                    <MdDelete /> Delete Password
                                </Button>


                            </Slide>
                        </Flex>

                    </DrawerBody>
                </DrawerContent>
            </Drawer>

        </>
    );
}
