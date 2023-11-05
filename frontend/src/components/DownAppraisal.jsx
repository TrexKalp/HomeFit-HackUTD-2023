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

export function DownAppraisal() {
  return (
    <Box
      maxW="100%"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}
      mt={5}
      boxShadow="md"
    >
      <Heading as="h3" size="md" mb={4}>
        Understanding Down Payment & Appraised Value
      </Heading>
      <Text mb={2}>
        The relationship between your down payment and the appraised value of a
        home is critical in mortgage processes. Here are insights to consider:
      </Text>
      <List spacing={3}>
        <ListItem>
          <ListIcon as={MdCheckCircle} color="green.500" />A higher down payment
          can reduce your mortgage interest rate and monthly payments, leading
          to significant savings over the life of the loan.
        </ListItem>
        <ListItem>
          <ListIcon as={MdCheckCircle} color="green.500" />
          If a home's appraisal falls short of the purchase price, you might
          need to renegotiate or put down more money.
        </ListItem>
        <ListItem>
          <ListIcon as={MdCheckCircle} color="green.500" />
          Consider saving for a down payment of at least 20% to avoid the
          additional cost of private mortgage insurance (PMI), which protects
          the lender if you default.
        </ListItem>
        <ListItem>
          <ListIcon as={MdCheckCircle} color="green.500" />
          Explore various mortgage programs that allow lower down payments if
          saving 20% is challenging, but be aware of potentially higher costs
          and fees.
        </ListItem>
        <ListItem>
          <ListIcon as={MdCheckCircle} color="green.500" />A higher appraisal
          than the purchase price boosts equity, offering benefits for future
          refinancing or sale.
        </ListItem>
        <ListItem>
          <ListIcon as={MdCheckCircle} color="green.500" />
          Keep in mind that market conditions can affect appraised values, so
          consider the timing of your purchase and the local real estate market
          trends.
        </ListItem>
      </List>
    </Box>
  );
}
