'use client'
import { useEffect, useState } from 'react';
import { Heading,Text, useDisclosure, Box, Tabs,  Text as ChakraText , TabList, Tab, TabPanels, TabPanel, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Flex, useColorModeValue, Divider, Center } from "@chakra-ui/react";

export default function Cards() {
    const [data, setData] = useState({ cats: [], dogs: [], objects: [], plants: [] });
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [openModalId, setOpenModalId] = useState<number | null>(null);

    useEffect(() => {
        fetch('/api/getTriggers')
            .then((res) => res.json())
            .then((newData) => setData(newData));

    }, []);
    // console.log(data);

    interface Item {
        id: number;
        name: string;
        objdes: string;
        imageurl: string;
    }

    const renderCards = (items: Item[]) => {

        return (
            <Flex wrap="wrap" justify="space-between">
                {items.map((item) => (
                    <Box

                        key={item.id}
                        flex="0 0 calc(33% - 1rem)"
                        height="400px"
                        borderWidth="1px"
                        borderRadius="md"
                        overflow="hidden"
                        mb="2rem"
                    >
                        <Box height="300px" overflow="hidden">
                            <img
                                src={item.imageurl}
                                alt={item.name}
                                onClick={() => { setOpenModalId(item.id); onOpen(); }}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                            />
                        </Box>
                        <Box p="4" flexDirection="column" alignItems="center">
                            <ChakraText fontWeight="bold" textAlign="center" mb="2">
                                {item.name}
                            </ChakraText>
                            <Button onClick={() => { setOpenModalId(item.id); onOpen(); }}>More info</Button>
                            <Modal isOpen={isOpen && openModalId === item.id} onClose={() => { setOpenModalId(null); onClose(); }}>

                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader>{item.name}</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>{item.objdes}</ModalBody>
                                    <ModalFooter>
                                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                                            Close
                                        </Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
                        </Box>
                    </Box>
                ))}
            </Flex>
        );
    };
    const colors = useColorModeValue(
        ['red.50', 'red.50',  'green.50',  'green.50'],
        ['red.900', 'red.900', 'green.900', 'green.900'],
    )
    const [tabIndex, setTabIndex] = useState(0)
    const bg = colors[tabIndex]

    return (

        <Box textAlign="center">
            <br/>
            <br/>
            <br/>
            <br/>
            <Heading marginTop="1">
            <Text textDecoration="none" _hover={{ textDecoration: 'none' }}>
            Find out asthma triggers around you

            </Text>
          </Heading>
            <Tabs variant='soft-rounded' colorScheme='blue' onChange={(index) => setTabIndex(index)} >
                <br/>
                <Divider />
                <br/>
                <TabList justifyContent="center" >
                    <Tab>Common ASTHMA Triggers</Tab>
                    <Tab>Asthma-inducing plants</Tab>
                    <Center height='50px'>
                        <Divider orientation='vertical' />
                    </Center>
                    <Tab>Hypoallergenic Cats</Tab>
                    <Tab>Hypoallergenic Dogs</Tab>
                </TabList>
                <br/>
                <Divider />
                <TabPanels p='2rem' bg={bg}>
                    <TabPanel>
                        {renderCards(data.objects)}</TabPanel>

                    <TabPanel>
                        {renderCards(data.plants)}</TabPanel>

                    <TabPanel>
                         <ChakraText>
                        The major allergen responsible for cat allergy symptoms is Fel d 1. Fel d 1 is a protein
                        produced by the skin or saliva. Due to this, <ChakraText as='b'>no cat is truly considered
                        hypoallergenic</ChakraText>, since all cats have skin and saliva. The cats considered safer to
                        those with cat allergies either produce less Fel d 1 or shed less – which in turn
                        leads to less shedding of the Fel d 1 proteins.

                        </ChakraText><br/>
                        <ChakraText>
                            Although these cats may be considered hypoallergenic, this also does not mean they are safe for
                            you personally. Before taking home a cat, consider seeing an allergist to rule out all
                            breeds you may be more sensitive to.
                        </ChakraText>
                        <br/>
                        <Divider />
                        <br/>
                        {renderCards(data.cats)}
                    </TabPanel>

                    <TabPanel>
                        <ChakraText>
                            Wondering what dogs are hypoallergenic? Are there big dogs that are
                            hypoallergenic? Small dogs that are hypoallergenic? The truth is,
                            there are <ChakraText as='b'>no 100% hypoallergenic dogs</ChakraText>,
                            dog breeds, or mixed-breeds,
                            but there are some dog breeds that are less allergenic for people
                            with dog allergies. Dander, which is attached to pet hair, is what
                            causes most dog allergies in people, and these dog breeds have a
                            non-shedding coat that produces less dander.
                        </ChakraText>
                        <br/>
                        <Divider />
                        <br/>
                        {renderCards(data.dogs)}
                    </TabPanel>
                </TabPanels>
            </Tabs>

        </Box>
    );
}