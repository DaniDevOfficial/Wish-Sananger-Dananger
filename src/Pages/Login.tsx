import {
    Box,
    SimpleGrid,
    GridItem,
    Icon,
    Input,
    InputGroup,
    InputLeftAddon,
    InputRightElement,
} from "@chakra-ui/react";
import {  FaUser, FaLock } from "react-icons/fa";

export function Login({ colorMode }) {
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
                width="400px"
                textAlign="center"
            >
                <SimpleGrid gap={6}>
                    <GridItem colSpan={2}>
                        <InputGroup variant="custom" colorScheme="purple">
                            <InputLeftAddon>Username:</InputLeftAddon>
                            <Input type="text" placeholder="Your Username"
                                color={colorMode === "light" ? "gray.400" : "gray.100"}
                            />
                            <InputRightElement pointerEvents="none">
                                <Icon as={FaUser} color="green.400" />
                            </InputRightElement>
                        </InputGroup>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <InputGroup variant="custom" colorScheme="purple">
                            <InputLeftAddon>Password:</InputLeftAddon>
                            <Input
                                type="password"
                                placeholder="Your Password"
                                color={colorMode === "light" ? "gray.400" : "white.400"}
                            />

                            <InputRightElement pointerEvents="none">
                                <Icon as={FaLock} color="red.400" />
                            </InputRightElement>
                        </InputGroup>
                    </GridItem>
                </SimpleGrid>
                
            </Box>
        </Box>
    );
}
