import { useState, useEffect } from "react";
import React from "react";
import Header from "./components/Header";
import {
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Flex,
    Box,
    Text,
    HStack,
    FormControl,
    FormLabel,
    Button,
    Input,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    useToast,
} from "@chakra-ui/react";
import axios from "axios";

const URL = process.env.REACT_APP_API_URL;
const JWTTOKEN = localStorage.getItem("jwt-token");

export default function Dashboard() {
    let [getOrderPageUserID, setGetOrderPageUserID] = useState("");
    let [getOrderError, setGetOrderError] = useState("");
    let [addOrderPageUserID, setAddOrderPageUserID] = useState("");
    let [addOrderPageSubTotal, setAddOrderPageSubTotal] = useState("");
    let [addOrderPagePhoneNumber, setAddOrderPagePhoneNumber] = useState("");
    let [addOrderError, setAddOrderError] = useState("");
    let [fetchedData, setFetchedData] = useState({});
    let toast = useToast();

    async function fetchOrder() {
        setGetOrderError("");
        setFetchedData({});
        if (!getOrderPageUserID || getOrderPageUserID == "") {
            setGetOrderError("User ID cannot be empty!");
            return;
        }
        let res = await axios.get(
            `${URL}/get-order?user_id=${getOrderPageUserID}`,
            {
                headers: {
                    Authorization: `Bearer ${JWTTOKEN}`,
                },
            }
        );
        if (res.data.success) {
            setFetchedData(res.data.data);
        } else {
            setGetOrderError(res.data.error.message);
        }
    }

    async function addOrder() {
        if (
            !addOrderPageUserID ||
            addOrderPageUserID == "" ||
            !addOrderPageSubTotal ||
            addOrderPageSubTotal == "" ||
            !addOrderPagePhoneNumber ||
            addOrderPagePhoneNumber == ""
        ) {
            setAddOrderError("All details required!");
            return;
        }
        let orderDetails = {
            user_id: addOrderPageUserID,
            sub_total: addOrderPageSubTotal,
            phone_number: addOrderPagePhoneNumber,
        };
        let res = await axios.post(`${URL}/add-order`, orderDetails, {
            headers: {
                Authorization: `Bearer ${JWTTOKEN}`,
            },
        });
        if (!res.data.success) {
            setAddOrderError(res.data.data.error.message);
        } else {
            toast({
                title: `Order added!`,
                description: `user_id : ${res.data.data.user_id}`,
                status: "success",
                duration: 9000,
                isClosable: true,
            });
            setAddOrderPageUserID("");
            setAddOrderPageSubTotal("");
            setAddOrderPagePhoneNumber("");
        }
    }
    return (
        <div>
            <Header />
            <Tabs
                isFitted
                variant="solid-rounded"
                padding={4}
                colorScheme="purple"
            >
                <TabList mb="1em">
                    <Tab border="1px" borderColor="purple.300">
                        Get Orders
                    </Tab>
                    <Tab border="1px" borderColor="purple.300">
                        Add Order
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Flex justifyContent="center" alignItems="center">
                            <Box>
                                <Text fontSize="2xl" align="center">
                                    Get Order Detail
                                </Text>
                                <Text fontSize="md" color="red" align="center">
                                    {getOrderError}
                                </Text>
                                <HStack justify="space-around" marginTop="4">
                                    <Input
                                        focusBorderColor="purple.600"
                                        type="text"
                                        value={getOrderPageUserID}
                                        onChange={(e) =>
                                            setGetOrderPageUserID(
                                                e.target.value
                                            )
                                        }
                                    />
                                    <Button
                                        size="md"
                                        variant="outline"
                                        colorScheme="purple"
                                        onClick={fetchOrder}
                                    >
                                        Fetch
                                    </Button>
                                </HStack>
                                <Box
                                    justifyContent="center"
                                    alignItems="center"
                                    marginBottom="4rem"
                                >
                                    {Object.keys(fetchedData).length > 0 ? (
                                        <Stat
                                            padding="2"
                                            marginTop="2rem"
                                            boxShadow="xl"
                                            bg="purple.200"
                                            borderRadius="8px"
                                        >
                                            <StatLabel>{`User ID : ${fetchedData.user_id}`}</StatLabel>
                                            <StatNumber>{`Sub total : ${fetchedData.sub_total}`}</StatNumber>
                                            <StatHelpText>
                                                {`Phone : ${fetchedData.phone_number}`}
                                            </StatHelpText>
                                        </Stat>
                                    ) : null}
                                </Box>
                            </Box>
                        </Flex>
                    </TabPanel>
                    <TabPanel>
                        <Flex justifyContent="center" alignItems="center">
                            <Box>
                                <Text fontSize="2xl" align="center">
                                    Add Order Details
                                </Text>
                                <Text fontSize="md" color="red" align="center">
                                    {addOrderError}
                                </Text>
                                <Box marginTop="1rem">
                                    <FormControl>
                                        <FormLabel>User ID</FormLabel>
                                        <Input
                                            focusBorderColor="purple.600"
                                            type="text"
                                            value={addOrderPageUserID}
                                            onChange={(e) =>
                                                setAddOrderPageUserID(
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Sub Total</FormLabel>
                                        <Input
                                            focusBorderColor="purple.600"
                                            type="number"
                                            value={addOrderPageSubTotal}
                                            onChange={(e) =>
                                                setAddOrderPageSubTotal(
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Phone Number</FormLabel>
                                        <Input
                                            focusBorderColor="purple.600"
                                            type="number"
                                            value={addOrderPagePhoneNumber}
                                            onChange={(e) =>
                                                setAddOrderPagePhoneNumber(
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </FormControl>
                                </Box>
                                <Flex
                                    alignItems="center"
                                    justifyContent="center"
                                    marginTop="1rem"
                                >
                                    <Button
                                        size="md"
                                        variant="outline"
                                        colorScheme="purple"
                                        onClick={addOrder}
                                    >
                                        Submit
                                    </Button>
                                </Flex>
                            </Box>
                        </Flex>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    );
}
