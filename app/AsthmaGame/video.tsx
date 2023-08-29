'use client';
import React from 'react'
  
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Avatar,
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    Flex,
    Heading,
    IconButton,
    List,
    ListIcon,
    ListItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
    UnorderedList,
    useColorMode,
    useDisclosure
} from '@chakra-ui/react';
import {BsThreeDotsVertical} from "react-icons/bs";
import { Search2Icon } from '@chakra-ui/icons';


export default function Video() {
    const {colorMode, toggleColorMode} = useColorMode();

    const symptomsDisclosure = useDisclosure();
    const causesDisclosure = useDisclosure();
    const riskDisclosure = useDisclosure();
    const firstDisclosure = useDisclosure();
  return (
    <>
        <Card maxWidth="90%" mx="auto">
            <CardHeader justifyContent="center" alignItems="center">
                <Heading  as={"span"} color={"cyan.400"} textAlign="center">
                    Let&apos;s learn how to prevent it!
                </Heading>
            </CardHeader>
            <CardBody  justifyContent="center" alignItems="center">

        <Accordion allowToggle>
            <AccordionItem>
                <h2>
                    <AccordionButton>
                        <Box as="span" flex='1' textAlign='center'>
                            🎬Let&apos;s watch an animation on the prevention of thunderstorm asthma!🥳
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <iframe width="1024" height="676" src="https://www.youtube.com/embed/_dTtfCesHhQ?si=hB7jddSrai44tgn9" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                    </div>
                </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
                <h2>
                    <AccordionButton>
                        <Box as="span" flex='1' textAlign='center'>
                            🎮Have fun with the game!🥳
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <iframe
                            src="https://cian-jiang.github.io/AsthmaGame/"
                            title="External Content"
                            width="1024"
                            height="676"
                        >
                            Your browser does not support iframes.
                        </iframe>
                    </div>
                </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
                <h2>
                    <AccordionButton>
                        <Box as="span" flex='1' textAlign='center'>
                            🎈Further information🥳
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <img
                            alt={'Hero Image'}
                            src={
                                'https://i.imgur.com/qK5wC1B.jpg'
                            }
                            style={{ width: "25%", height: "auto" }}
                        />
                        <Box position="relative" p={12}>


                                <List spacing={3}>
                                    <ListItem>
                                        <ListIcon as={Search2Icon} color='green.500' />

                                        <Button mb={4}  onClick={symptomsDisclosure.onOpen}>What are the symptoms?</Button>
                                        <Modal isOpen={symptomsDisclosure.isOpen} onClose={symptomsDisclosure.onClose}>
                                            <ModalOverlay />
                                            <ModalContent>
                                                <ModalHeader>What are the symptoms?</ModalHeader>
                                                <ModalCloseButton />
                                                <ModalBody>
                                                    Symptoms associated with thunderstorm asthma include wheeze, chest tightness, difficulty breathing and
                                                    cough. The symptoms can escalate very quickly and may become life threatening.
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button colorScheme="blue" mr={3} onClick={symptomsDisclosure.onClose}>
                                                        Close
                                                    </Button>

                                                </ModalFooter>
                                            </ModalContent>
                                        </Modal>
                                    </ListItem>

                                    <ListItem>
                                        <ListIcon as={Search2Icon} color='green.500' />
                                        <Button mb={4}  onClick={causesDisclosure.onOpen}>What causes thunderstorm asthma?</Button>
                                        <Modal isOpen={causesDisclosure.isOpen} onClose={causesDisclosure.onClose}>
                                            <ModalOverlay />
                                            <ModalContent>
                                                <ModalHeader>What causes thunderstorm asthma?</ModalHeader>
                                                <ModalCloseButton />
                                                <ModalBody>
                                                    The cause of thunderstorm asthma is not fully understood.
                                                    <br/>
                                                    Exposure to high concentrations of very small fragments of pollen appears to be an important part of the cause of thunderstorm asthma.
                                                    <br/>It is thought that moisture in the air during a thunderstorm swells pollen grains which burst, generating tiny fragments of pollen. Airflows in some thunderstorms concentrate these fragments in high numbers at ground level where they may be breathed in and affect people at risk of asthma symptoms.
                                                    <br/>In NSW, high levels of rye grass pollen appear to be associated with thunderstorm asthma in some areas.
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button colorScheme="blue" mr={3} onClick={causesDisclosure.onClose}>
                                                        Close
                                                    </Button>
                                                </ModalFooter>
                                            </ModalContent>
                                        </Modal>
                                    </ListItem>

                                    <ListItem>
                                        <ListIcon as={Search2Icon} color='green.500' />
                                        <Button mb={4}  onClick={riskDisclosure.onOpen}>Who is at risk?</Button>
                                        <Modal isOpen={riskDisclosure.isOpen} onClose={riskDisclosure.onClose}>
                                            <ModalOverlay />
                                            <ModalContent>
                                                <ModalHeader>Who is at risk?</ModalHeader>
                                                <ModalCloseButton />
                                                <ModalBody>
                                                    People with asthma, people with undiagnosed asthma, people with hay fever (allergic rhinitis),
                                                    and especially people who wheeze and sneeze during spring.
                                                </ModalBody>

                                                <ModalFooter>
                                                    <Button colorScheme="blue" mr={3} onClick={riskDisclosure.onClose}>
                                                        Close
                                                    </Button>

                                                </ModalFooter>
                                            </ModalContent>
                                        </Modal>
                                    </ListItem>

                                    <ListItem>
                                        <ListIcon as={Search2Icon} color='green.500' />
                                        <Button mb={4}  onClick={firstDisclosure.onOpen}> When we needs to immediately call ambulance?</Button>
                                        <Modal isOpen={firstDisclosure.isOpen} onClose={firstDisclosure.onClose}>
                                            <ModalOverlay />
                                            <ModalContent>
                                                <ModalHeader> What situation needs to immediately call triple zero [000] for an ambulance?</ModalHeader>
                                                <ModalCloseButton />
                                                <ModalBody>
                                                    <UnorderedList>
                                                        <ListItem>Obvious difficulty breathing</ListItem>
                                                        <ListItem>Cannot speak in full sentences in one breath</ListItem>
                                                        <ListItem>Tugging in of the skin between ribs or at base of neck</ListItem>
                                                        <ListItem>May have cough or wheeze</ListItem>
                                                        <ListItem>Reliever medicine not lasting as long as usual</ListItem>
                                                        <ListItem>Turning blue</ListItem>
                                                        <ListItem>Not responding to reliver medicine</ListItem>
                                                        <ListItem>Collapsing</ListItem>
                                                    </UnorderedList>
                                                </ModalBody>

                                                <ModalFooter>
                                                    <Button colorScheme="blue" mr={3} onClick={firstDisclosure.onClose}>
                                                        Close
                                                    </Button>

                                                </ModalFooter>
                                            </ModalContent>
                                        </Modal>
                                    </ListItem>

                                </List>


                        </Box>
                    </div>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>


            </CardBody>
        </Card>
    
    </>
    
  )
}
