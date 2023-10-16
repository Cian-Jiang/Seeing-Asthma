'use client'
import { useEffect, useState } from 'react';
import { Heading, Text, Box, Tabs, Text as ChakraText, TabList, Tab, TabPanels, TabPanel, Button, Flex, useColorModeValue, Divider, Center } from "@chakra-ui/react";

export default function Cards() {
    const [data, setData] = useState({ cats: [], dogs: [], objects: [], plants: [] });
    const [isFlipped, setIsFlipped] = useState<number | null>(null);
    const [supportsHover, setSupportsHover] = useState(false);

    useEffect(() => {
        fetch('/api/getTriggers')
            .then((res) => res.json())
            .then((newData) => setData(newData));

        // Check if device supports hover
        if (window.matchMedia('(hover: hover)').matches) {
            setSupportsHover(true);
        }
    }, []);

    const handleHoverEnter = (id: number) => {
        if (supportsHover) {
            setIsFlipped(id);
        }
    };
    
    const handleHoverLeave = () => {
        if (supportsHover) {
            setIsFlipped(null);
        }
    };
    
    const handleClick = (id: number) => {
        if (!supportsHover) {
            setIsFlipped(prev => prev !== id ? id : null);
        }
    };

    const renderCards = (items: any[], category: string) => {
        return (
            <Flex wrap="wrap" justify="space-between">
                {items.map((item) => (
                    <Box
                        key={item.id}
                        flex={['0 0 calc(100% - 1rem)', '0 0 calc(50% - 1rem)', '0 0 calc(33.33% - 1rem)']}
                        height="400px"
                        borderWidth="1px"
                        borderRadius="md"
                        overflow="hidden"
                        mb="2rem"
                        onMouseEnter={() => handleHoverEnter(item.id)}
                        onMouseLeave={handleHoverLeave}
                        onClick={() => handleClick(item.id)}
                        position="relative"
                    >
                        {/* front of the card */}
                        <Box position="absolute" 
                            width="100%" 
                            height="100%" 
                            style={{
                                backfaceVisibility: 'hidden',
                                transition: 'transform 0.6s',
                                transformStyle: 'preserve-3d',
                                transform: isFlipped === item.id ? 'rotateY(180deg)' : 'rotateY(0deg)'
                            }}
                        >
                            <Box height="300px" overflow="hidden">
                                <img
                                    src={item.imageurl}
                                    alt={item.name}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                />
                            </Box>
                            <Box p="4" flexDirection="column" alignItems="center">
                                <ChakraText fontWeight="bold" textAlign="center" mb="2">
                                    {category === 'objects' ? item.display_name : item.name}
                                </ChakraText>
                            </Box>
                        </Box>
    
                        {/* back of the card */}
                        <Box position="absolute" 
                            width="100%" 
                            height="100%" 
                            backgroundColor="white" 
                            style={{
                                backfaceVisibility: 'hidden',
                                transition: 'transform 0.6s',
                                transformStyle: 'preserve-3d',
                                transform: isFlipped === item.id ? 'rotateY(0deg)' : 'rotateY(180deg)'
                            }}
                        >
                            <Box height="300px" 
                            overflow="hidden" 
                            display='flex' 
                            flexDirection="column" 
                            justifyContent="center" 
                            style={{
                                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.75)), url(${item.imageurl})`, // Set the image as background with a fade effect
                                backgroundSize: 'cover', // Cover the entire box with the image
                                backgroundPosition: 'center' // Center the image
                            }}>
                                
                                <br/>
                                <ChakraText fontWeight="bold" textAlign="justify" mb="2" padding={2}>
                                    {item.objdes}
                                </ChakraText>
                            </Box>
                            <Box p="4" flexDirection="column" alignItems="center">
                                <ChakraText fontWeight="bold" textAlign="center" mb="2">
                                    {category === 'objects' ? item.display_name : item.name}
                                </ChakraText>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Flex>
        );
    };
    
    const colors = useColorModeValue(
        ['red.50', 'red.50', 'green.50', 'green.50'],
        ['red.900', 'red.900', 'green.900', 'green.900']
    );
    const [tabIndex, setTabIndex] = useState(0);
    const bg = colors[tabIndex];

    return (

        <Box textAlign="center">
            
            <Tabs variant='soft-rounded' colorScheme='blue' onChange={(index) => setTabIndex(index)} >
                <br/>
                <Divider />
                <br/>
                <TabList justifyContent="center" flexWrap="wrap">
                    <Tab>Common Asthma Triggers</Tab>
                    <Tab>Asthma-Inducing Plants</Tab>
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
                        {renderCards(data.objects, 'objects')}</TabPanel>

                    <TabPanel>
                        {renderCards(data.plants, 'plants')}</TabPanel>

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
                        {renderCards(data.cats, 'cats')}
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
                        {renderCards(data.dogs,'dogs')}
                    </TabPanel>
                </TabPanels>
            </Tabs>

        </Box>
    );
}