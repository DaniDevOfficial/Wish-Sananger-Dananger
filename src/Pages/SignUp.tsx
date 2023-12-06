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
    useColorModeValue,

} from "@chakra-ui/react";
import { toast } from "react-toastify";
import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { getUserByName } from '../repo/repo';
import { Link } from "react-router-dom";
import { ref, push, set } from 'firebase/database';
import { database } from '../firebase';
import { useNavigate } from "react-router-dom"
import { hashPasswordBcrypt, hashPasswordSha256 } from '../repo/GlobalFunctions';

export function SignUp({ colorMode }: { colorMode: string }) {
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

            if (userByName) {
                console.log("A user with this name already exists");
                toast.error("A user with this name already exists", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                });
            } else {

                const usersRef = ref(database, 'users');
                const newUserRef = push(usersRef);


                const hashedPassword = hashPasswordBcrypt(password);
                const userID = newUserRef.key
                const userData = {
                    username: username,
                    hashedPassword: hashedPassword,
                    userID: userID,
                };
                toast.success("Sign Up successful")
                console.log('Sign Up successful');
                sessionStorage.setItem('userID', userID);
                sessionStorage.setItem('username', username);
                const key = userID + "" + password
                sessionStorage.setItem('key', hashPasswordSha256(key) )
                set(newUserRef, userData);
                navigate('/dashboard');



            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }


    const bg = useColorModeValue('black', 'white')
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
                    Create a new Account
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
                    Sign Up
                </Button>
                <br />
                <ChakraLink
                    as={Link}
                    to="/login"
                    color={bg}
                    fontWeight="bold"
                    fontSize="18px"
                    _hover={{ textDecor: "underline" }}>
                    <Text as="span">Or</Text> Sign Up
                </ChakraLink>
                <br />
                <Link to={"/Legal"}>Legal</Link>
            </Box>
        </Box>
    );
}
