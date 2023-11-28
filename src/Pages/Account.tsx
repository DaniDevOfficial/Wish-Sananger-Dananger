import {
    Box,
    SimpleGrid,
    GridItem,
    Icon,
    Input,
    InputGroup,
    InputLeftAddon,
    InputRightElement,
    Heading,
    FormControl,
    Button,
    Link as ChakraLink,
    Text,
    Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { checkMasterPassword, encryptText, hashPasswordBcrypt, hashPasswordSha256 } from "../repo/GlobalFunctions";
import { getPasswordsWithCreatorID } from "../repo/repo";
import { database } from "../firebase";
import { ref, set } from "firebase/database";

export function Account({ colorMode }: { colorMode: string }) {
    const [masterPassword, setMasterPassword] = useState<string | null>("");
    const [newPassword, setNewPassword] = useState<string | null>("");
    const [newUsername, setNewUsername] = useState<string | null>("");
    const [confirmPassword, setConfirmPassword] = useState<string | null>("");
    const [confirmMasterPassword, setConfirmMasterPassword] = useState<string | null>("");

    const userID = sessionStorage.getItem("userID")
    const username = sessionStorage.getItem("username")
    const key = sessionStorage.getItem("key")
    const navigate = useNavigate();

    async function verifyAndChangePassword() {
        if (!masterPassword || !newPassword || !confirmPassword) {
            return;
        }

        const masterCheck = await checkMasterPassword(masterPassword, userID);
        console.log(masterCheck);

        if (masterCheck) {
            const plainKey = userID + "" + newPassword;
             const newKey = hashPasswordSha256(plainKey);
             sessionStorage.setItem("key", newKey)
            const userPasswords = await getPasswordsWithCreatorID(userID, key);

            console.log(1)
            for (const passwordEntry of userPasswords) {
                const { creatorID, passwordID, ...rest } = passwordEntry;
                const passwordRef = ref(database, `passwords/${passwordID}`);

                const encryptedData = encryptFields(rest, newKey);

                const encryptedPasswordEntry = {
                    creatorID,
                    passwordID,
                    ...encryptedData
                };

                console.log(encryptedPasswordEntry)
                set(passwordRef, encryptedPasswordEntry);

            }
            const userRef = ref(database, `users/${userID}`);
            const hashedPassword = hashPasswordBcrypt(newPassword);

            const userData = {
                username: username,
                hashedPassword: hashedPassword,
                password: newPassword,
                userID: userID,
            };
            set(userRef, userData)

        } else {
            return;
        }
    }

    function encryptFields(fields, secretKey) {
        const encryptedFields = {};

        for (const [key, value] of Object.entries(fields)) {
            if (typeof value === 'string' && secretKey !== 'creatorID' && secretKey !== 'passwordID') {
                encryptedFields[key] = encryptText(value, secretKey);
            } else {
                encryptedFields[key] = value;
            }
        }

        return encryptedFields;
    }


    async function verifyAndChangeUsername() {
        // await verifyMasterPassword();
    }


    return (
        <Box
            position="relative"
            h="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
            bg={colorMode === "light" ? "gray.100" : "gray.800"}
        >
            <Box
                p={4}
                bg={colorMode === "light" ? "gray.400" : "gray.600"}
                borderRadius="lg"
                boxShadow="md"
                width={{ base: "90vw", md: "50vw" }}
                textAlign="center"
            >
                <Button
                    position="absolute"
                    top="1"
                    left="1"
                    onClick={() => navigate("/dashboard")}
                    colorScheme="purple"
                    variant="ghost"
                >
                    Back to Dashboard
                </Button>
                <Heading as="h2" size="xl" marginBottom="10" mt={2}>
                    Account Settings:
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                    <Box mt="-10px">
                        <FormControl isRequired>
                            <InputGroup variant="custom" colorScheme="purple" margin="10px 0">
                                <Input
                                    type="password"
                                    placeholder="Your Master Password"
                                    color={colorMode === "light" ? "black" : "white.400"}
                                    onChange={(e) => setMasterPassword(e.target.value)}
                                />
                                <InputRightElement pointerEvents="none">
                                    <Icon as={FaLock} color="red.400" />
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>

                        <FormControl isRequired>
                            <InputGroup variant="custom" colorScheme="purple" margin="10px 0">
                                <Input
                                    type="password"
                                    placeholder="New Password"
                                    color={colorMode === "light" ? "black" : "white.400"}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <InputRightElement pointerEvents="none">
                                    <Icon as={FaLock} color="red.400" />
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>

                        <FormControl isRequired>
                            <InputGroup variant="custom" colorScheme="purple" margin="10px 0">
                                <Input
                                    type="password"
                                    placeholder="Confirm Password"
                                    color={colorMode === "light" ? "black" : "white.400"}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <InputRightElement pointerEvents="none">
                                    <Icon as={FaLock} color="red.400" />
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>

                    </Box>
                    <Box mt="-10px">
                        <FormControl isRequired>
                            <InputGroup variant="custom" colorScheme="purple" margin="10px 0">
                                <Input
                                    type="text"
                                    placeholder="New Username"
                                    color={colorMode === "light" ? "black" : "gray.100"}
                                    onChange={(e) => setNewUsername(e.target.value)}
                                />
                                <InputRightElement pointerEvents="none">
                                    <Icon as={FaUser} color="green.400" />
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <FormControl isRequired>
                            <InputGroup variant="custom" colorScheme="purple" margin="10px 0">
                                <Input
                                    type="password"
                                    placeholder="Confirm Password"
                                    color={colorMode === "light" ? "black" : "white.400"}
                                    onChange={(e) => setConfirmMasterPassword(e.target.value)}
                                />
                                <InputRightElement pointerEvents="none">
                                    <Icon as={FaLock} color="red.400" />
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>

                    </Box>

                </SimpleGrid>
                <Flex justifyContent="space-between" alignItems="center">
                    <Button
                        colorScheme="purple"
                        marginTop="4"
                        onClick={verifyAndChangePassword}
                        disabled={!masterPassword || !newPassword || newPassword !== confirmPassword}
                        marginLeft="auto"
                        marginRight="auto"
                    >
                        Change Master Password
                    </Button>
                    <Button
                        colorScheme="purple"
                        marginTop="4"
                        onClick={verifyAndChangeUsername}
                        disabled={!masterPassword || !newUsername}
                        marginLeft="auto"
                        marginRight="auto"
                    >
                        Change Username
                    </Button>
                </Flex>
            </Box >
        </Box >
    );
}
