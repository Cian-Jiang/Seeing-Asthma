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

    const handleIngredientChange = (values: ((prevState: never[]) => never[]) | (string | number)[]) => {
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
               

                <Text style={{ fontSize: '35px'}} color={'blue.400'} >Alright, let&apos;s cook today!</Text>
                <Text style={{ fontSize: '20px'}} color={'gray.500'}>🥘 First, choose the ingredients (you can click on the options below)</Text>
                <br/>
                <CheckboxGroup
                    onChange={(values) => handleIngredientChange(values)}
                    defaultValue={selectedIngredients}
                >
                    <Flex>
                        <Text style={{ fontSize: '20px'}}>🥬 Vegetables</Text>

                    </Flex>
                   
                    <Flex>


                        <Checkbox value="Potato" color={'gray.500'}>🥔Potato</Checkbox>
                        <Checkbox value="Carrot" color={'gray.500'}>🥕Carrot</Checkbox>
                        <Checkbox value="Cauliflower" color={'gray.500'}>🥦Cauliflower</Checkbox>
                    </Flex>
                    <br/>
                    <Flex>
                        <Text style={{ fontSize: '20px'}}>🥩 Meats</Text>

                    </Flex>
                    
                    <Flex>
                        <Checkbox value="pork" color={'gray.500'}>🐷 pork</Checkbox>
                        <Checkbox value="Sausage" color={'gray.500'}>🌭Sausage</Checkbox>
                    </Flex>
                </CheckboxGroup>
                <br/>
                <Button onClick={handleSubmit} isDisabled={selectedIngredients.length === 0}>
                    🍲 Let&apos;s see the recipe combinations!</Button>
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
                            <Divider />
                            <Button as="a" href={video.videoUrl} target="_blank">
                                Watch Video
                            </Button>
                        </LinkBox>
                    ))}
                </Flex>
        </Box>


    );
}