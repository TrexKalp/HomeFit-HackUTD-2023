import { Box, Heading, Text, List, ListItem, ListIcon } from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";

export function CreditScoreTips() {
  return (
    <Box
      maxW="100%"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}
      my={5}
      boxShadow="md"
    >
      <Heading as="h3" size="md" mb={4}>
        Tips for Raising Your Credit Score
      </Heading>
      <Text mb={2}>
        Enhancing your credit score is essential for better financial
        opportunities. Here are practical steps to improve it:
      </Text>
      <List spacing={3}>
        <ListItem>
          <ListIcon as={MdCheckCircle} color="green.500" />
          Pay all your bills on time, as payment history is a key factor in
          credit scoring.
        </ListItem>
        <ListItem>
          <ListIcon as={MdCheckCircle} color="green.500" />
          Reduce credit card balances and keep credit utilization low; aim for
          under 30% of your limit.
        </ListItem>
        <ListItem>
          <ListIcon as={MdCheckCircle} color="green.500" />
          Avoid opening multiple new credit accounts in a short time; this can
          lower your average account age.
        </ListItem>
        <ListItem>
          <ListIcon as={MdCheckCircle} color="green.500" />
          Check your credit reports regularly and dispute any inaccuracies you
          find.
        </ListItem>
        <ListItem>
          <ListIcon as={MdCheckCircle} color="green.500" />
          Consider asking for higher credit limits if you have a good repayment
          history, as this can improve credit utilization.
        </ListItem>
        <ListItem>
          <ListIcon as={MdCheckCircle} color="green.500" />
          Be strategic about taking on debt; only borrow what you need and can
          afford to repay.
        </ListItem>
        <ListItem>
          <ListIcon as={MdCheckCircle} color="green.500" />
          Use a mix of credit types responsibly to show you can handle different
          types of credit.
        </ListItem>
      </List>
    </Box>
  );
}
