/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { getUserByName } from '../repo/repo';
import { Link, useNavigate  } from "react-router-dom";
import { checkPassword } from "../repo/GlobalFunctions";

export function Login({ colorMode }: { colorMode: string }) {
    const [username, setUsername] = useState<string | null>("");
    const [password, setPassword] = useState<string | null>("");

    const navigate = useNavigate();

    async function verify() {
        if (!username || !password) {
            console.log("Username and password are required.");
            toast.error("Username and password are required", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
            });
            return;
        }

        try {
            const userByName = await getUserByName(username);

            if (!userByName) {
                console.log("Invalid username or password");
                toast.error("Invalid username or password", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                });
            } else {
                if (!await checkPassword(password, userByName.hashedPassword)) {
                    console.log("Invalid username or password");
                    toast.error("Invalid username or password", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 5000,
                    });
                } else {
                    localStorage.setItem('userId', userByName.id);
                    localStorage.setItem('username', userByName.username);


                    console.log("Logged in");
                    toast.success("Logged in");
                    navigate('dashboard');

                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
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
                width="50vw"
                textAlign="center"
            >
                <Heading as="h2" size="xl" marginBottom="10" mt={2}>
                    Login to your Account
                </Heading>
                <SimpleGrid gap={6}>

                    <GridItem colSpan={2}>
                        <FormControl isRequired>
                            <InputGroup variant="custom" colorScheme="purple">
                                <InputLeftAddon>Username:</InputLeftAddon>
                                <Input type="text" placeholder="Your Username"
                                    color={colorMode === "light" ? "black" : "gray.100"}
                                    onChange={(e) => setUsername(e.target.value)}

                                />
                                <InputRightElement pointerEvents="none">
                                    <Icon as={FaUser} color="green.400" />
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <FormControl isRequired>

                            <InputGroup variant="custom" colorScheme="purple">
                                <InputLeftAddon>Password:</InputLeftAddon>
                                <Input
                                    type="password"
                                    placeholder="Your Password"
                                    color={colorMode === "light" ? "black" : "white.400"}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <InputRightElement pointerEvents="none">
                                    <Icon as={FaLock} color="red.400" />
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                    </GridItem>
                </SimpleGrid>
                <Button
                    colorScheme='purple'
                    marginTop="4"
                    onClick={verify}
                    disabled={!username || !password}
                >
                    Login
                </Button>
                <br />
                <ChakraLink
                    as={Link}
                    to="/signup"
                    color={colorMode === "light" ? "black" : "gray.100"}
                    fontWeight="bold"
                    fontSize="18px"
                    _hover={{ textDecor: "underline" }}>
                    <Text as="span">Or</Text> Sign Up
                </ChakraLink>
            </Box>
        </Box>
    );
}
