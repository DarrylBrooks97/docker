import axios from 'axios';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
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
	useToast,
} from '@chakra-ui/react';

export default function Home(): ReactJSXElement {
	const route = useRouter();
	const toast = useToast();
	const [value, setValue] = useState<any[]>([]);
	const [locations, setLocations] = useState<any[]>([]);
	const [airport, setAirport] = useState<string>('');

	const getLocations = async (): Promise<void> => {
		try {
			const { locations, error } = await (
				await axios.get('/api/airports')
			).data;
			setLocations(error ?? locations);
			setValue(locations);
		} catch (error) {
			toast({
				title: 'Error',
				description: `${error}`,
				status: 'error',
				duration: 3000,
				isClosable: true,
			});
		}
	};

	const handleClick = async (): Promise<void> => {
		if (airport.length === 0) {
			toast({
				title: 'Error',
				description: 'Field must be filled out before submission',
				status: 'error',
				duration: 3000,
				isClosable: true,
			});
			return;
		}

		if (airport.length !== 3) {
			toast({
				title: 'Error',
				description: 'Only airport codes are valid',
				status: 'error',
				duration: 3000,
				isClosable: true,
			});

			return;
		}

		try {
			const { message } = await (
				await axios.post('/api/airports', {
					location: airport,
					size: Math.floor(Math.random() * 500),
				})
			).data;

			console.log(message);

			toast({
				title: 'Success',
				description: `Airport has succesfully been added!`,
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
		} catch (error) {
			toast({
				title: 'Error',
				description: `${error}`,
				status: 'error',
				duration: 3000,
				isClosable: true,
			});
		}
	};
	useEffect(() => {
		getLocations();
	}, []);

	return (
		<Box
			w="100vw"
			h="100vh"
			display="flex"
			flexDirection="column"
			bgColor="#FFFFFF"
			p={6}
		>
			<VStack justifyContent="center" align="center">
				<Stack
					display="flex"
					justify="center"
					alignItems="center"
					spacing={5}
				>
					<Text fontSize="5xl" fontWeight="bold">
						US Airports
					</Text>
					<Input
						placeholder="Airport Code"
						w="full"
						onChange={(e): void => setAirport(e.target.value)}
						onKeyDown={(e): Promise<void> | null =>
							e.key === 'Enter' ? handleClick() : null
						}
					/>
					<Button
						borderRadius={20}
						colorScheme="blue"
						size="sm"
						onClick={handleClick}
					>
						Submit !
					</Button>
				</Stack>
			</VStack>
			<Center mt={10}>
				<Box w="80%">
					<Grid templateColumns="repeat(3,1fr)" gap={2}>
						{value.map(({ name, idx }: any) => {
							return (
								<GridItem
									key={idx}
									display="flex"
									w="100%"
									justifyContent="center"
									transition="all 0.5s"
									onClick={() =>
										route.push(
											`https://www.google.com/search?q=${name}`
										)
									}
									_hover={{
										transform: 'scale(1.1)',
										zIndex: '2',
									}}
								>
									<Box
										w="50%"
										h="50%"
										pos="relative"
										key={idx}
									>
										<Image
											src="https://images.unsplash.com/photo-1578234467412-b0bbdb4c2283?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1074&q=80"
											alt={idx}
											borderRadius={20}
											key={idx}
										/>
										<Box
											position="absolute"
											top="5"
											left="5"
											key={idx}
										>
											<Text
												color="white"
												fontWeight="bold"
												fontSize="x-large"
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
