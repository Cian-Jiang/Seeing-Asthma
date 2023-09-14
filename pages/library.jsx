import { useEffect, useState } from 'react';
import { useDisclosure, Box, Tabs, TabList, Tab, TabPanels, TabPanel, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react";

export default function Home() {
    const [data, setData] = useState({ cats: [], dogs: [], objects: [], plants: [] });
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        fetch('/api/getAllTriggers')
            .then((res) => res.json())
            .then((newData) => setData(newData));
    }, []);

    const renderCards = (items) => {
        return items.map((item) => (
            <Box key={item.id}>
                <img src={item.imageurl} alt={item.name} />
                <h3>{item.name}</h3>
                <Button onClick={onOpen}>More info</Button>
                <Modal isOpen={isOpen} onClose={onClose}>
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
        ));
    };

    return (
        <Box>
            <h1>Asthma Trigger</h1>
            <Tabs variant='soft-rounded' colorScheme='green'>
                <TabList>
                    <Tab>Object</Tab>
                    <Tab>Cat</Tab>
                    <Tab>Dog</Tab>
                    <Tab>Plant</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>{renderCards(data.objects)}</TabPanel>
                    <TabPanel>{renderCards(data.cats)}</TabPanel>
                    <TabPanel>{renderCards(data.dogs)}</TabPanel>
                    <TabPanel>{renderCards(data.plants)}</TabPanel>
                </TabPanels>
            </Tabs>


        </Box>
    );
}
