import { Box, Heading, List, ListItem, ListIcon, Text } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

function ApprovedTips() {
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
        Tips for Loan Approval
      </Heading>
      <Text mb={4}>
        Follow these tips to increase your chances of getting your loan
        approved:
      </Text>
      <List spacing={3}>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          Boost your credit score to at least 640.
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          Increase your down payment to lower the LTV ratio.
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          Pay off existing debts to reduce your DTI ratio.
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          Look for a more affordable home to keep your front-end DTI below 28%.
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          Be aware of PMI costs when your LTV is between 80-95%.
        </ListItem>
      </List>
    </Box>
  );
}

export default ApprovedTips;
