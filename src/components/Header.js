import React from 'react';
import { Container, Box, Heading } from '@chakra-ui/react';
export default function Header() {
  return (
    <Box bg="purple.600" padding="2">
      <Container centerContent padding="2">
        <Heading as="h1" size="2xl" color="white">
          Voosh Challange
        </Heading>
      </Container>
    </Box>
  );
}
