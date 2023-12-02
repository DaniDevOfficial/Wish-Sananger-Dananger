import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./Login";
import {
    IconButton,
    useColorMode,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa"
import { SignUp } from "./SignUp";
import { Dashboard } from "./Dashboard";
import Testing from "./testing";
import { Account } from "./Account";
import { Legal } from "./Legal";
export function RouterWrapper() {
    const { toggleColorMode, colorMode } = useColorMode();

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login colorMode={colorMode} />} />
                    <Route path="/login" element={<Login colorMode={colorMode} />} />
                    <Route path="/signup" element={<SignUp colorMode={colorMode} />} />
                    <Route path="/dashboard" element={<Dashboard colorMode={colorMode}/>} />
                    <Route path="/Legal" element={<Legal />} />
                    <Route path="/account" element={<Account colorMode={colorMode} />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes >
            </BrowserRouter >
            <IconButton
                aria-label="toggle theme"
                rounded="full"
                size="xs"
                position="fixed"
                bottom={4}
                left={4}
                onClick={toggleColorMode}
                icon={colorMode === "dark" ? <FaSun /> : <FaMoon />}
            />

        </>
    )
}