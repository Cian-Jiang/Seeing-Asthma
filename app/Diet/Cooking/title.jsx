'use client';

import {
    Box,
    Button,
    Checkbox,
    CheckboxGroup,
    Flex,
    Text,
    Image,
    Stack,
    Heading,
    Card,
    CardBody,
    Divider,
    LinkBox,
    LinkOverlay,
    Link,
} from "@chakra-ui/react";
import { useState, useRef } from "react";


export default function Home() {
    const boxRef = useRef(null);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [videos, setVideos] = useState([]);
    const allIngredients = ["Potato", "Carrot", "Cauliflower", "pork", "Sausage", "Broccoli","Sweet potato","Carrot","Kale","Spinach","Salmon","Tuna","Herring","Diary","Eggs","Soy","Wheat", "Tomato", "Soy"];

    const handleIngredientChange = (values) => {
        // @ts-ignore
        setSelectedIngredients(values);
    };

    const handleSubmit = async () => {
        // Pass the selected ingredients to the API
        const response = await fetch("https://api.healthcoder.live/recipe_video", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                // "api_key": "your_api_key",
            },
            body: new URLSearchParams({
                ingredients: selectedIngredients.join(","),
            }),
        });
        const data = await response.json();
        setVideos(data.videos);

        if (boxRef.current) {
            window.scrollTo({
                top: boxRef.current.offsetTop,
                behavior: 'smooth'
            });
        }
    };

    const handleClearSelection = () => {
        setSelectedIngredients([]);
    };


    return (
        <Box>
            <Text style={{ fontSize: '35px'}} color={'blue.400'} align='center'>Alright, let's cook today!</Text>
            <Text style={{ fontSize: '20px'}} color={'gray.500'} align='center'>🥘 First, choose the ingredients (by selecting the options below)</Text>
            <br/>

            <Flex
                direction="column"
                align="center"
                justify="center"
                m="auto"
                mt={10}
                width="100%"
            >
               

                
                <CheckboxGroup
                    onChange={(values) => handleIngredientChange(values)}
                    value={selectedIngredients}
                >
                    
                    <Flex flexDirection={["column", "column", "row"]}  justify='center' wrap='wrap' width='100%' maxW='1200px'>
                        <Box width={['100%', "100%", '32%']} 
                            mb={10} 
                            mr={[0, 0, 2]} 
                            display="flex" 
                            flexDirection="column" 
                            alignItems="center" 
                            justifyContent="center"
                            >
                            <Flex>
                                <Text style={{ fontSize: '20px'}}>🟢 Safe for Asthma </Text>

                            </Flex>
                            <br/>
                            <Flex><Checkbox value="Potato" color={'gray.500'}>🥔Potato</Checkbox></Flex>
                                
                            <Flex><Checkbox value="Cauliflower" color={'gray.500'}>🥦Cauliflower</Checkbox></Flex>
                            <Flex><Checkbox value="Pork" color={'gray.500'}>🐷 Pork</Checkbox></Flex>
                            <Flex><Checkbox value="Sausage" color={'gray.500'}>🌭Sausage</Checkbox></Flex>
                            <Flex><Checkbox value="Broccoli" color={'gray.500'}>🥦Broccoli</Checkbox></Flex>
                            <Flex><Checkbox value="Sweet potato" color={'gray.500'}>🍠Sweet potato</Checkbox></Flex>
                            <Flex><Checkbox value="Tomato" color={'gray.500'}>🍅Tomato</Checkbox></Flex>
                            <Flex><Checkbox value="Carrot" color={'gray.500'}>🥕Carrot</Checkbox></Flex>
                            <Flex><Checkbox value="Kale" color={'gray.500'}>🌿Kale</Checkbox></Flex>
                            <Flex><Checkbox value="Spinach" color={'gray.500'}>🥬Spinach</Checkbox></Flex>
                            <Flex><Checkbox value="Salmon" color={'gray.500'}>🍣Salmon</Checkbox></Flex>
                        </Box>
                        
                        <Box width={['100%', "100%", '32%']} 
                            mb={10} 
                            mr={[0, 0, 2]}
                            display="flex" 
                            flexDirection="column" 
                            alignItems="center" 
                            //justifyContent="center"
                            >
                            <Flex>
                                <Text style={{ fontSize: '20px'}}>🟡 Maybe Safe for Asthma</Text>

                            </Flex>
                            <br/>
                            
                            <Flex><Checkbox value="Tuna" color={'gray.500'}>🐟Tuna</Checkbox></Flex>
                            <Flex><Checkbox value="Wheat" color={'gray.500'}>🌾Wheat</Checkbox></Flex>
                            <Flex><Checkbox value="Soy" color={'gray.500'}>🧊Soy</Checkbox></Flex>
                            <Flex><Checkbox value="Herring" color={'gray.500'}>🎣Herring</Checkbox></Flex>
                            <Flex><Checkbox value="Dairy" color={'gray.500'}>🧀Dairy</Checkbox></Flex>
                            <Flex><Checkbox value="Eggs" color={'gray.500'}>🥚Eggs</Checkbox></Flex>
                                
                            
                        </Box>
                    
                        <Box width={['100%', "100%", '32%']} 
                            mb={6} 
                            display="flex" 
                            flexDirection="column"
                            alignItems="center" 
                            //justifyContent="center"
                            >
                            <Flex>
                                <Text style={{ fontSize: '20px'}}>🔴 Not Safe for Asthma</Text>

                            </Flex>
                            <br/>

                            <Flex><Checkbox value="Pickle" color={'gray.500'} isDisabled={true}>🥫Pickle</Checkbox></Flex>
                            <Flex><Checkbox value="Shrimp" color={'gray.500'} isDisabled={true}>🦐Shrimp</Checkbox></Flex>
                            <Flex><Checkbox value="Beans" color={'gray.500'} isDisabled={true}> 🫘Beans</Checkbox></Flex>
                            <Flex><Checkbox value="Processed meat" color={'gray.500'} isDisabled={true}>🥩Processed meat</Checkbox></Flex>
                            <Flex><Checkbox value="Shellfish" color={'gray.500'} isDisabled={true}> 🦪Shellfish</Checkbox></Flex>
                            

                        </Box>

                    </Flex>
                    
                   
                </CheckboxGroup>
                <br/>

                <Flex mt={4} spacing={4}>

                    <Button 
                        colorScheme={'green'} 
                        bg={'cyan.400'} 
                        px={6}
                        _hover={{
                            bg: 'cyan.500',
                        }}
                        onClick={handleSubmit} 
                        isDisabled={selectedIngredients.length === 0}
                        width="100%"
                        mr={4}
                    >
                        Get Recipes
                    </Button>

                    <Button 
                        onClick={handleClearSelection} 
                        bg={'red.500'}
                        px={6}
                        color={'white'}
                        _hover={{
                            bg: 'red.400',
                        }}
                        isDisabled={selectedIngredients.length === 0}
                        width="100%"
                        
                    >
                        Clear Selection
                    </Button>

                </Flex>

            </Flex>

            <Box ref={boxRef}>
                <Flex wrap="wrap" justify="center" mt="6">
                    {videos.map((video, index) => (
                        <LinkBox as={Card} key={index} width={[ '100%', '50%', '31%' ]}>
                            <CardBody>
                                <Link href={video.videoUrl} target="_blank">
                                    <Flex alignItems="center" justifyContent="center">
                                        <Image src={video.thumbnailUrl} borderRadius="lg" />
                                    </Flex>

                                </Link>
                                
                                <Stack mt="6" spacing="3">
                                    <Heading size="md" color={'blue.400'} >
                                        <Link href={video.videoUrl} target="_blank">
                                            {video.title}
                                        </Link>
                                    </Heading>
                                    <Text align='justify'>{video.description}</Text>
                                </Stack>
                            </CardBody>
                            
                        </LinkBox>
                    ))}
                </Flex>
            </Box>
            
        </Box>


    );
}