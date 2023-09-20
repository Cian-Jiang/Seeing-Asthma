"use client";
import { useState } from 'react';
import {
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Stack,
    Heading,
    Text,
    Box,
    Button,
    CircularProgress,
    Flex,
    useToast,
    SimpleGrid,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Link,
} from "@chakra-ui/react";
import { useDisclosure,  Text as ChakraText ,  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useColorModeValue, Divider, Center } from "@chakra-ui/react";
import { useEffect } from 'react';
function MyAccordion({ result }) {
    const [showButton, setShowButton] = useState(false);
    // console.log(result)

    useEffect(() => {
        const shouldShowButton = result.some(item => ['Cat', 'Dog', 'Flower', 'Plant', 'Tree'].includes(item.name));
        setShowButton(shouldShowButton);
    }, [result]);
    const bgColor = useColorModeValue('blue.50', 'blue.900');
    

    // console.log(result)
    // console.log()
    return (
        <div>

            <Accordion defaultIndex={[0]} allowMultiple>
            {Array.isArray(result) && result.map((item, index) => (
                <AccordionItem key={index}>
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex="1" textAlign="left" color={'blue.400'} fontSize="16px" fontWeight="bold">
                                {item.name}
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        {item.objdes}
                    </AccordionPanel>
                    {item.name === "Cat" && (
                        <Center mt={2}>
                            <Link href="/Trigger/PlantPet?tab=Cat">
                                <Button colorScheme="blue" variant="outline">
                                    Cat Image Recognition
                                </Button>
                            </Link>
                        </Center>
                    )}
                    {item.name === "Dog" && (
                        <Center mt={2}>
                            <Link href="/Trigger/PlantPet?tab=Dog">
                                <Button colorScheme="blue" variant="outline">
                                    Dog Image Recognition
                                </Button>
                            </Link>
                        </Center>
                    )}
                    {(item.name === "Plant" || item.name === "Flower" || item.name === "Tree") && (
                        <Center mt={2}>
                            <Link href="/Trigger/PlantPet?tab=Plant">
                                <Button colorScheme="blue" variant="outline">
                                    Plant Image Recognition
                                </Button>
                            </Link>
                        </Center>
                    )}
                    {/* Add similar conditionals for other categories if necessary */}
                </AccordionItem>
            ))}

            </Accordion>
            <br/>
            {showButton && (
                <Center mt={4}>
                    <Link href="/Trigger/PlantPet">
                        <Text
                            textTransform={'uppercase'}
                            color={'blue.400'}
                            fontWeight={600}
                            fontSize={'sm'}
                            bg={bgColor}
                            p={2}
                            rounded={'md'}>
                            Click to identify whether plants and pets
                        </Text>
                    </Link>
                </Center>
            )}
        </div>
    );
}

export default function Upload() {
    const [image, setImage] = useState(null);
    //const [type, setType] = useState('Plant');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hasUploadedImage, setHasUploadedImage] = useState(false);
    const toast = useToast();
    //const { isOpen, onOpen, onClose } = useDisclosure();
    //const [openModalId, setOpenModalId] = useState("");
    // const [txt, setTxt] = useState("");
    const [bgColor, setBgColor] = useState("");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleTypeChange = (e) => {
        setType(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('image', image);


        const response = await fetch('https://api.healthcoder.live/image_general', {
            method: 'POST',
            // // headers: {
            //     'api_key': process.env.API_KEY, // Replace with your actual API key
            // },
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            setResult(data);


        } else {
            const errorBody = await response.text();
            setResult(`Error: ${response.status} ${errorBody}`);
            toast({
                title: "Error",
                description: errorBody,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
        setLoading(false);
    };
    const [uploadedImage, setUploadedImage] = useState(null);
    const handleImageUpload = (file) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setUploadedImage(event.target.result);
                setHasUploadedImage(true);
            };
            reader.readAsDataURL(file);
            //console.log(uploadedImage);
        }
    };
    const handleImageChangeAndUpload = (e) => {
        handleImageChange(e); // 调用 handleImageChange 函数
        const file = e.target.files[0];
        handleImageUpload(file); // 调用 handleImageUpload 函数
    };

    useEffect(() => {
        if (uploadedImage) {
            // uploadedImage已更新，设置背景图像
            document.getElementById("image_display").style.backgroundImage = `url(${uploadedImage})`;
        }
    }, [uploadedImage]);

    return (
        <>


            <SimpleGrid minChildWidth='320px' spacing='40px' m={5}>

                <Box position="relative"
                     p={3}
                     height='550px'
                     borderWidth='1px' borderRadius='lg' overflow='hidden'
                >

                    <ChakraText fontSize='3xl' color={'blue.400'}  as='b'>
                        General  Image Recognition
                        <br/>
                    </ChakraText>
                    <br/>
                    <label htmlFor="image">Image:</label>
                    <input type="file" id="image" accept="image/*" onChange={handleImageChangeAndUpload} />
                    <br/>
                    <br/>
                    <Box
                        id="image_display"
                        w='100%'
                        h='300px'
                        borderWidth="1px"
                        borderColor="black"
                        backgroundPosition="center"
                        backgroundSize="contain"
                        backgroundRepeat="no-repeat"
                        backgroundImage={hasUploadedImage ? `url(${image})` : 'url(/2.png)'}

                    >

                    </Box>
                    <br/>
                    <form onSubmit={handleSubmit}>

                        <Button type="submit">Submit</Button>
                    </form>



                </Box>

                <Box position="relative"
                     p={3}
                     height='550px'
                     borderWidth='1px' borderRadius='lg'
                     overflow='auto'
                    // display='flex'
                     alignItems='center'
                     justifyContent='center'
                >
                    {loading ? (
                        <CircularProgress isIndeterminate color='green.300' />
                    ) : Array.isArray(result) && result.length >= 1 ? (
                        result && (

                            <Box

                                flex="0 0 calc(33% - 1rem)"
                                // height="500px"
                                w='100%'
                                // borderWidth="1px"
                                borderRadius="md"
                                overflow="auto"

                                mb="2rem"
                            >

                                <ChakraText fontSize='2xl' color={'blue.400'}  as='b'>
                                    Here are the asthma triggers detected in the picture:

                                </ChakraText>
                                <br/>
                                <br/>
                                <MyAccordion result={result} />




                            </Box>
                        )

                    ): (
                        result ? (
                            <Box position="relative"
                                 flex="0 0 calc(33% - 1rem)"
                                 w='100%'
                                 h='100%'
                                 borderRadius="md"
                                 overflow="hidden"
                                 mb="2rem"
                                 display='flex'
                                 alignItems='center'
                                 flexDirection='column'
                                 justifyContent='center'
                            >
                                <ChakraText fontSize='2xl' color={'red.400'}  as='b' textAlign='center'>
                                    {result.split('"')[3]}

                                    <br/>
                                    <br/>
                                    Please try again with a different photo.
                                    <br/>
                                </ChakraText>
                                <ChakraText fontSize='lg' color={'#939597'}   textAlign='center'>
                                    <br/>
                                    <br/>
                                    Tips:
                                    <br/>
                                    PLease make sure no much clutter in the background.
                                    Better to place the subject in the center.

                                </ChakraText>



                            </Box>


                        ) : (
                            <Box position="relative"
                                 flex="0 0 calc(33% - 1rem)"
                                 w='100%'
                                 h='100%'
                                 borderRadius="md"
                                 overflow="hidden"
                                 mb="2rem"
                                 display='flex'
                                 flexDirection='column'
                                 alignItems='center'
                                 justifyContent='center'
                            >
                                <ChakraText fontSize='2xl' color={'blue.400'}  as='b' textAlign='center'>
                                    Result will be shown after the image has been uploaded.

                                </ChakraText>
                                <ChakraText fontSize='lg' color={'#939597'}   textAlign='center'>
                                    <br/>
                                    <br/>
                                    Tips:
                                    <br/>
                                    PLease make sure no much clutter in the background.
                                    Better to place the subject in the center.

                                </ChakraText>

                            </Box>

                        )
                    )}

                </Box>

            </SimpleGrid>
            {/*</Flex>*/}

        </>

    );
}
