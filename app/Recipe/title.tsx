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
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>

                <Text>Alright, let's cook today!</Text>
                <Text>🥘 First, choose the ingredients (you can click on the options below)</Text>
                <CheckboxGroup
                    onChange={(values) => handleIngredientChange(values)}
                    defaultValue={selectedIngredients}
                >
                    <Flex>
                        <Text>🥬 Vegetables</Text>

                    </Flex>
                    <Flex>


                        <Checkbox value="Potato">🥔Potato</Checkbox>
                        <Checkbox value="Carrot">🥕Carrot</Checkbox>
                        <Checkbox value="Cauliflower">🥦Cauliflower</Checkbox>
                    </Flex>
                    <br/>
                    <Flex>
                        <Text>🥩 Meats</Text>

                    </Flex>
                    <br/>
                    <Flex>
                        <Checkbox value="pork">🐷 pork</Checkbox>
                        <Checkbox value="Sausage">🌭Sausage</Checkbox>
                    </Flex>
                </CheckboxGroup>
                <Button onClick={handleSubmit} isDisabled={selectedIngredients.length === 0}>
                    🍲 Let's see the recipe combinations!</Button>
            </Flex>

            <Flex wrap="wrap" justify="center" mt="6">
                    {videos.map((video, index) => (
                        <LinkBox as={Card} maxW="sm" m="4" key={index}>
                            <CardBody>
                                <Image src={video.thumbnailUrl} borderRadius="lg" />
                                <Stack mt="6" spacing="3">
                                    <Heading size="md">{video.title}</Heading>
                                    <Text>{video.description}</Text>
                                </Stack>
                            </CardBody>
                            <Divider />
                            <LinkOverlay href={video.videoUrl} isExternal>
                                Watch Video
                            </LinkOverlay>
                        </LinkBox>
                    ))}
                </Flex>
        </Box>


    );
}
