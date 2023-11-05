import { Box, Heading, List, ListItem, ListIcon, Text } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

function LtvTips() {
  return (
    <Box
      maxW="100%"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}
      my={5}
    >
      <Heading as="h3" size="md" mb={4}>
        Tips for a Better Loan-to-Value Ratio (LTV)
      </Heading>
      <Text mb={4}>
        Improving your LTV can lead to more favorable loan terms:
      </Text>
      <List spacing={3}>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          Consider a higher down payment to decrease the LTV ratio.
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          Choose a less expensive home to reduce the amount you need to borrow.
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          Improve your credit score to qualify for better mortgage rates.
        </ListItem>
      </List>
    </Box>
  );
}

function DtiTips() {
  return (
    <Box
      maxW="100%"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}
      my={5}
    >
      <Heading as="h3" size="md" mb={4}>
        Tips for a Lower Debt-to-Income Ratio (DTI)
      </Heading>
      <Text mb={4}>
        A lower DTI can increase your chances of loan approval:
      </Text>
      <List spacing={3}>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          Pay down existing debts to minimize monthly obligations.
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          Avoid taking on new debt before applying for a mortgage.
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          Increase your income through side jobs or other revenue streams.
        </ListItem>
      </List>
    </Box>
  );
}

export { LtvTips, DtiTips };
