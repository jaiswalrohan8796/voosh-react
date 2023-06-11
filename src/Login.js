import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header.js";
import {
    Box,
    Container,
    FormControl,
    FormLabel,
    Input,
    Text,
    Button,
    HStack,
    Flex,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import axios from "axios";

const URL = process.env.REACT_APP_API_URL;

export default function Login() {
    let navigate = useNavigate();
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [error, setError] = useState("");
    function handleSignup() {
        navigate("/signup");
    }

    async function handleLogin() {
        try {
            if (email == "" || password == "") {
                setEmail("");
                setPassword("");
                throw new Error("Email & Password required!");
            }
            let res = await axios.post(`${URL}/login`, {
                email,
                password,
            });
            if (res.data.success) {
                localStorage.setItem("jwt-token", res.data.data.token);
                navigate("/");
            } else {
                setEmail("");
                setPassword("");
                throw new Error(res.data.error.message);
            }
        } catch (err) {
            setError(err.message);
        }
    }
    return (
        <Box>
            <Header />
            <Flex justifyContent="center" alignItems="center" height="80vh">
                <Container
                    maxW="md"
                    padding="4"
                    borderColor="gray.200"
                    borderRadius="8"
                    boxShadow="xl"
                    marginTop="4"
                    bg="purple.50"
                    centerContent
                >
                    <Text fontSize="md" color="red">
                        {error}
                    </Text>
                    <Text fontSize="2xl">Login</Text>
                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input
                            focusBorderColor="purple.600"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Password</FormLabel>
                        <Input
                            focusBorderColor="purple.600"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormControl>
                    <Box w="100%">
                        <HStack justify="space-around" marginTop="4">
                            <Button
                                size="md"
                                variant="outline"
                                colorScheme="purple"
                                onClick={handleSignup}
                            >
                                Signup
                            </Button>
                            <Button
                                size="md"
                                variant="solid"
                                colorScheme="purple"
                                rightIcon={<ArrowForwardIcon />}
                                onClick={handleLogin}
                            >
                                Login
                            </Button>
                        </HStack>
                    </Box>
                </Container>
            </Flex>
        </Box>
    );
}
