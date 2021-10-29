import axios from "axios";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { ChangeEvent, useState } from "react";
import {
  Box,
  Stack,
  Input,
  Button,
  Text,
  VStack,
  Grid,
  GridItem,
  Image,
  Center,
} from "@chakra-ui/react";

export default function Home(): ReactJSXElement {
  const [value, setValue] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);

  const filter = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(
      locations.filter((el) => el.name.includes(e.target.value.toUpperCase()))
    );
  };

  const handleClick = async (): Promise<void> => {
    try {
      const { locations, error } = await (await axios("/api/airports")).data;
      setLocations(error ?? locations);
      setValue(locations);
    } catch (err) {
      console.log({ err });
    }
  };

  return (
    <Box
      w='100vw'
      h='100vh'
      display='flex'
      flexDirection='column'
      bgColor='#FFFFFF'
      p={6}
    >
      <VStack justifyContent='center' align='center'>
        <Stack display='flex' justify='center' alignItems='center' spacing={5}>
          <Text fontSize='5xl' fontWeight='bold'>
            Trip Planner
          </Text>
          <Input
            placeholder='Location'
            w='full'
            onChange={(e): void => filter(e)}
            onKeyDown={(e): Promise<void> | null =>
              e.key === "Enter" ? handleClick() : null
            }
          />
          <Button
            borderRadius={20}
            colorScheme='blue'
            onClick={handleClick}
            size='sm'
          >
            Submit !
          </Button>
        </Stack>
      </VStack>
      <Center mt={10}>
        <Box w='80%'>
          <Grid templateColumns='repeat(3,1fr)' gap={2}>
            {value.map(({ name, idx }: any) => {
              return (
                <GridItem
                  key={idx}
                  display='flex'
                  w='100%'
                  justifyContent='center'
                  transition='all 0.5s'
                  _hover={{ transform: "scale(1.1)", zIndex: "2" }}
                >
                  <Box w='50%' h='50%' pos='relative' key={idx}>
                    <Image
                      src='https://images.unsplash.com/photo-1578234467412-b0bbdb4c2283?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1074&q=80'
                      alt={idx}
                      borderRadius={20}
                      key={idx}
                    />
                    <Box position='absolute' top='5' left='5' key={idx}>
                      <Text
                        color='white'
                        fontWeight='bold'
                        fontSize='x-large'
                        key={idx}
                      >
                        {name}
                      </Text>
                    </Box>
                  </Box>
                </GridItem>
              );
            })}
          </Grid>
        </Box>
      </Center>
    </Box>
  );
}
