import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./Login";
import {
    IconButton,
    useColorMode,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa"
export function RouterWrapper() {
    const { toggleColorMode, colorMode } = useColorMode();

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login colorMode={colorMode} />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes >
            </BrowserRouter >
            <IconButton
                    aria-label="toggle theme"
                    rounded="full"
                    size="xs"
                    position="absolute"
                    bottom={4}
                    left={4}
                    onClick={toggleColorMode}
                    icon={colorMode === "dark" ? <FaSun /> : <FaMoon />}
                />

        </>
    )
}