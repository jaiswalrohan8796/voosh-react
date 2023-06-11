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

export default function Signup() {
    let navigate = useNavigate();
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [phone, setPhone] = useState("");
    let [error, setError] = useState("");

    async function handleSignup() {
        if (
            !name ||
            name == "" ||
            !email ||
            email == "" ||
            !password ||
            password == "" ||
            !phone ||
            phone == ""
        ) {
            setError("All fields are required!");
            return;
        }
        try {
            let res = await axios.post("http://localhost:8080/signup", {
                name,
                email,
                password,
                phone,
            });
            if (res.data.success) {
                navigate("/login");
            } else {
                throw new Error(res.data.error.message);
            }
        } catch (err) {
            setError(err.message);
        }
    }

    function handleLogin() {
        navigate("/login");
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
                    <Text fontSize="2xl">Signup</Text>
                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input
                            focusBorderColor="purple.600"
                            type="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </FormControl>
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
                    <FormControl>
                        <FormLabel>Phone</FormLabel>
                        <Input
                            focusBorderColor="purple.600"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </FormControl>
                    <Box w="100%">
                        <HStack justify="space-around" marginTop="4">
                            <Button
                                size="md"
                                variant="outline"
                                colorScheme="purple"
                                onClick={handleLogin}
                            >
                                Login
                            </Button>
                            <Button
                                size="md"
                                variant="solid"
                                colorScheme="purple"
                                rightIcon={<ArrowForwardIcon />}
                                onClick={handleSignup}
                            >
                                Signup
                            </Button>
                        </HStack>
                    </Box>
                </Container>
            </Flex>
        </Box>
    );
}
