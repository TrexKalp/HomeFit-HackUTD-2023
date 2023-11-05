import {
  Box,
  Heading,
  Text,
  List,
  ListItem,
  ListIcon,
  Card,
} from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";

export function DebtTips() {
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
        Tips for Managing Debt
      </Heading>
      <Text mb={2}>
        Achieving financial health is possible with the right approach to
        managing debt. Below are some detailed strategies:
      </Text>
      <List spacing={3}>
        <ListItem>
          <ListIcon as={MdCheckCircle} color="green.500" />
          Build a precise monthly budget including all sources of income and
          expenses; commit to following this budget to avoid overspending.
        </ListItem>
        <ListItem>
          <ListIcon as={MdCheckCircle} color="green.500" />
          Examine all debts closely and prioritize them; opt for paying off
          high-interest debts first or tackle smaller debts for quicker
          victories.
        </ListItem>
        <ListItem>
          <ListIcon as={MdCheckCircle} color="green.500" />
          Look into debt consolidation options as a means to potentially lower
          interest rates and aggregate payments into one to manage repayments
          more efficiently.
        </ListItem>
        <ListItem>
          <ListIcon as={MdCheckCircle} color="green.500" />
          Aim to allocate extra funds to pay more than the minimum on credit
          card balances, which can greatly reduce the amount of interest accrued
          over time.
        </ListItem>
        <ListItem>
          <ListIcon as={MdCheckCircle} color="green.500" />
          Implement a strategy to prevent accruing new debts; use cash or debit
          for transactions until you have a solid plan to pay off what you
          currently owe.
        </ListItem>
        <ListItem>
          <ListIcon as={MdCheckCircle} color="green.500" />
          Regularly review your financial plan to account for changes in income
          or expenses, and adjust your budget and debt payment plan accordingly.
        </ListItem>
      </List>
    </Box>
  );
}
