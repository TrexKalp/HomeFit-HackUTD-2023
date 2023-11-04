'use client'

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

export default function Page1() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Are you ready to buy a home? Lets Check!
          </Heading>
         
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
           
            
                <FormControl id="monthlyincome" isRequired>
                  <FormLabel>Gross Monthly Income</FormLabel>
                  <NumberInput defaultValue={15} min={10} max={20}>
  <NumberInputField />
  <NumberInputStepper>
    <NumberIncrementStepper />
    <NumberDecrementStepper />
  </NumberInputStepper>
</NumberInput>
                </FormControl>
          
         
                <FormControl id="credit" isRequired>
                  <FormLabel>Credit Score</FormLabel>
                  <NumberInput defaultValue={15} min={10} max={20}>
  <NumberInputField />
  <NumberInputStepper>
    <NumberIncrementStepper />
    <NumberDecrementStepper />
  </NumberInputStepper>
</NumberInput>
                </FormControl>
        
          
            <FormControl id="Appraisal" isRequired>
              <FormLabel>Appraisal Value</FormLabel>
              <NumberInput defaultValue={15} min={10} max={20}>
  <NumberInputField />
  <NumberInputStepper>
    <NumberIncrementStepper />
    <NumberDecrementStepper />
  </NumberInputStepper>
</NumberInput>
            </FormControl>

            <FormControl id="downpayment" isRequired>
              <FormLabel>Down Payment</FormLabel>
              <NumberInput defaultValue={15} min={10} max={20}>
  <NumberInputField />
  <NumberInputStepper>
    <NumberIncrementStepper />
    <NumberDecrementStepper />
  </NumberInputStepper>
</NumberInput>
            </FormControl>

            <FormControl id="creditcard" isRequired>
              <FormLabel>Credit Card Payment</FormLabel>
              <NumberInput defaultValue={15} min={10} max={20}>
  <NumberInputField />
  <NumberInputStepper>
    <NumberIncrementStepper />
    <NumberDecrementStepper />
  </NumberInputStepper>
</NumberInput>
            </FormControl>
            <FormControl id="carpayment" isRequired>
              <FormLabel>Car Payment</FormLabel>
              <NumberInput defaultValue={15} min={10} max={20}>
  <NumberInputField />
  <NumberInputStepper>
    <NumberIncrementStepper />
    <NumberDecrementStepper />
  </NumberInputStepper>
</NumberInput>
            </FormControl>

            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Check Eligibility
              </Button>
            </Stack>
           
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}