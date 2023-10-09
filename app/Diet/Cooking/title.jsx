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
import { useState } from "react";

export default function Home() {
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
    };
    //https://blog.csdn.net/weixin_45664217/article/details/119895716
    const handleRandomSelection = () => {
        var randomIngredients = [];
        
        for (let i = 0; i < 3; i++) {
            const randomIndex = Math.floor(Math.random() * allIngredients.length);
            randomIngredients.push(allIngredients[randomIndex]);
            allIngredients.splice(randomIndex, 1);
        }
    
        setSelectedIngredients(randomIngredients);
    };
    


    return (
        <Box>


            <Flex
                direction="column"
                align="center"
                justify="center"
                m="auto"
                mt={10}
                w="50%"
            >
               

                <Text style={{ fontSize: '35px'}} color={'blue.400'} >Alright, let`s cook today!</Text>
                <Text style={{ fontSize: '20px'}} color={'gray.500'}>🥘 First, choose the ingredients (you can click on the options below)</Text>
                <br/>
                <CheckboxGroup
                    onChange={(values) => handleIngredientChange(values)}
                    value={selectedIngredients}
                >
                    <Button onClick={handleRandomSelection} mt={4}>
                        🎲 Randomly Pick 3 Ingredients
                    </Button>
                    <Flex>
                        <Box mr={5}>
                            <Flex>
                                <Text style={{ fontSize: '20px'}}>🟢 Safe for asthma</Text>

                            </Flex>
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
                        
                        <Box mr={5}>
                            <Flex>
                                <Text style={{ fontSize: '20px'}}>🟡 Maybe safe for asthma</Text>

                            </Flex>
                            
                            
                            <Flex><Checkbox value="Tuna" color={'gray.500'}>🐟Tuna</Checkbox></Flex>
                            <Flex><Checkbox value="Wheat" color={'gray.500'}>🌾Wheat</Checkbox></Flex>
                            <Flex><Checkbox value="Soy" color={'gray.500'}>🧊Soy</Checkbox></Flex>
                            <Flex><Checkbox value="Herring" color={'gray.500'}>🎣Herring</Checkbox></Flex>
                            <Flex><Checkbox value="Dairy" color={'gray.500'}>🧀Dairy</Checkbox></Flex>
                            <Flex><Checkbox value="Eggs" color={'gray.500'}>🥚Eggs</Checkbox></Flex>
                                
                            
                        </Box>
                    
                        <Box mr={5}>
                            <Flex>
                                <Text style={{ fontSize: '20px'}}>🔴 No good for asthma</Text>

                            </Flex>
                            
                            <Flex><Checkbox value="Pickle" color={'gray.500'} isDisabled={true}>🥫Pickle</Checkbox></Flex>
                            <Flex><Checkbox value="Shrimp" color={'gray.500'} isDisabled={true}>🦐Shrimp</Checkbox></Flex>
                            <Flex><Checkbox value="Beans" color={'gray.500'} isDisabled={true}> 🫘Beans</Checkbox></Flex>
                            <Flex><Checkbox value="Processed meat" color={'gray.500'} isDisabled={true}>🥩Processed meat</Checkbox></Flex>
                            <Flex><Checkbox value="Shellfish" color={'gray.500'} isDisabled={true}> 🦪Shellfish</Checkbox></Flex>
                            

                        </Box>

                    </Flex>
                    
                   
                </CheckboxGroup>
                <br/>
                <Button onClick={handleSubmit} isDisabled={selectedIngredients.length === 0}>
                    🍲 Let`s see the recipe combinations!</Button>
            </Flex>

            <Flex wrap="wrap" justify="center" mt="6">
                    {videos.map((video, index) => (
                        <LinkBox as={Card} maxW="sm" m="4" key={index}>
                            <CardBody>
                                <Link href={video.videoUrl} target="_blank">
                                    <Image src={video.thumbnailUrl} borderRadius="lg" />
                                </Link>
                                
                                <Stack mt="6" spacing="3">
                                    <Heading size="md" color={'blue.400'} >
                                        <Link href={video.videoUrl} target="_blank">
                                            {video.title}
                                        </Link>
                                    </Heading>
                                    <Text>{video.description}</Text>
                                </Stack>
                            </CardBody>
                            
                        </LinkBox>
                    ))}
                </Flex>
        </Box>


    );
}