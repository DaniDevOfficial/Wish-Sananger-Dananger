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
} from "@chakra-ui/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { hashPasswordSha256 } from "../repo/GlobalFunctions";

export function Account({ colorMode }: { colorMode: string }) {
    const [masterPassword, setMasterPassword] = useState<string | null>("");
    const [newPassword, setNewPassword] = useState<string | null>("");
    const [newUsername, setNewUsername] = useState<string | null>("");
    const [confirmPassword, setConfirmPassword] = useState<string | null>("");

    const navigate = useNavigate();

    async function verifyAndChangePassword() {
        // await verifyMasterPassword();
    }

    async function verifyAndChangeUsername() {
        // await verifyMasterPassword();
    }

    async function verifyMasterPassword() {
        if (!masterPassword) {
            showError("Master Password is required");
            return;
        }

        try {
            const userID = sessionStorage.getItem("userID");
            const user = await getUserByID(userID);

            if (!(await checkPassword(masterPassword.trim(), user.hashedPassword))) {
                showError("Invalid master password");
            } else {
                // Master password verification successful, proceed with the requested action
                console.log("Master password verified");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            showError("Error fetching user data");
        }
    }

    function showError(message: string) {
        console.log(message);
        toast.error(message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
        });
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
                    Account Settings
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                    <FormControl isRequired>
                        <InputGroup variant="custom" colorScheme="purple">
                            <InputLeftAddon>Master Password:</InputLeftAddon>
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
                        <InputGroup variant="custom" colorScheme="purple">
                            <InputLeftAddon>New Password:</InputLeftAddon>
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
                        <InputGroup variant="custom" colorScheme="purple">
                            <InputLeftAddon>Confirm Password:</InputLeftAddon>
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

                    <Button
                        colorScheme="purple"
                        marginTop="4"
                        onClick={verifyAndChangePassword}
                        disabled={!masterPassword || !newPassword || newPassword !== confirmPassword}
                    >
                        Change Master Password
                    </Button>

                    <FormControl isRequired>
                        <InputGroup variant="custom" colorScheme="purple">
                            <InputLeftAddon>New Username:</InputLeftAddon>
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

                    <Button
                        colorScheme="purple"
                        marginTop="4"
                        onClick={verifyAndChangeUsername}
                        disabled={!masterPassword || !newUsername}
                    >
                        Change Username
                    </Button>
                </SimpleGrid>
            </Box>
        </Box>
    );
}
