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
    useRangeSlider,


} from "@chakra-ui/react";
import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { getAllData, getUserByName } from '../repo/repo';

export function Login({ colorMode }: { colorMode: string }) {
    const [username, setUsername] = useState<string | null>("");
    const [password, setPassword] = useState<string | null>("");

    if (password == "1") return
    if (username == "1") return
    const userName = 'john';

        async function fetchDataAndLog() {
            try {
              const allUsers = await getAllData('users');
              console.log(allUsers);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          }
          
          fetchDataAndLog();
          async function fetchSinglAndLog() {
            try {
              const allUsers = await getUserByName("john");
              console.log(allUsers);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          }
          
          fetchSinglAndLog();
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
                >
                    Login
                </Button>
            </Box>
        </Box>
    );
}
