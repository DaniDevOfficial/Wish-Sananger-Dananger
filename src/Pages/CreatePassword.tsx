import React from 'react';
import {
  Box,
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
  useDisclosure,
  Button,
} from '@chakra-ui/react';

export function CreatePassword() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Open CreatePassword</Button>

      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent p={4}>
          <DrawerCloseButton />
          <DrawerHeader textAlign="center">Create Password</DrawerHeader>

          <DrawerBody>
            <Slide in={isOpen} direction="right">
              <Box w="80%">
                <FormControl mb={4}>
                  <FormLabel>Website</FormLabel>
                  <Input placeholder="Enter website" />
                </FormControl>

                <FormControl mb={4}>
                  <FormLabel>Username</FormLabel>
                  <Input placeholder="Enter username" />
                </FormControl>

                <FormControl mb={4}>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" placeholder="Enter email" />
                </FormControl>

                <FormControl mb={4}>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" placeholder="Enter password" />
                </FormControl>
              </Box>
            </Slide>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
