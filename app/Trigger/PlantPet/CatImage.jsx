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

} from "@chakra-ui/react";
import { useDisclosure,  Text as ChakraText ,  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useColorModeValue, Divider, Center } from "@chakra-ui/react";
import { useEffect } from 'react';


export default function Upload() {
    const [image, setImage] = useState(null);
    const [type, setType] = useState('Plant');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hasUploadedImage, setHasUploadedImage] = useState(false);
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [openModalId, setOpenModalId] = useState("");
    const [txt, setTxt] = useState("");
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
        formData.append('type', 'Cat');

        const response = await fetch('https://api.healthcoder.live/image_recognition', {
            method: 'POST',
            // // headers: {
            //     'api_key': process.env.API_KEY, // Replace with your actual API key
            // },
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            setResult(data);

            if (data.safe === "yes") {
                setTxt("Congratulations, that’s a Hypoallergenic Cat!");
                setBgColor("#A0DAA9");
            } else {
                setTxt("Sorry, that's not a Hypoallergenic Cat!");
                setBgColor("tomato");
            }

        } else {
            const errorBody = await response.text();
            setResult(`Error: ${response.status} ${errorBody}`);
            
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


            <SimpleGrid minChildWidth='320px' spacing='40px'>

                <Box position="relative"
                     p={3}
                     height='575px'
                     borderWidth='1px' 
                     borderRadius='lg' 
                     overflow='hidden'
                     b
                >

                    <ChakraText fontSize='3xl' color={'blue.400'}  as='b'>
                        Cat Image Recognition
                        <br/>
                    </ChakraText>
                    <Text color={'gray.500'}>
                        Recognise your cats&apos; species, to find out if they are safe for you!
                    </Text>
                    <br/>
                    <label htmlFor="image">Image: </label>
                    <input type="file" id="image" accept="image/*" onChange={handleImageChangeAndUpload} />
                    <br/>
                    <br/>
                    <Box
                        id="image_display"
                        w='100%'
                        h='300px'
                        borderWidth="0px"
                        borderColor="none"
                        backgroundPosition="center"
                        backgroundSize="contain"
                        backgroundRepeat="no-repeat"
                        backgroundImage={hasUploadedImage ? `url(${image})` : 'url(/2.png)'}

                    >

                    </Box>
                    <br/>
                    <form onSubmit={handleSubmit}>

                        <Button colorScheme={'green'} 
                                bg={'cyan.400'}
                                px={8}
                                _hover={{
                                    bg: 'cyan.500',
                                }}
                                type = 'Submit'>
                                    Submit
                        </Button>
                    </form>



                </Box>

                <Box position="relative"
                     p={3}
                      height='575px'
                      borderWidth='1px' borderRadius='lg'
                     overflow='hidden'
                     // display='flex'
                     alignItems='center'
                     justifyContent='center'
                >
                        {loading ? (
                            <CircularProgress isIndeterminate color='green.300' />
                        ) : result?.name ?(
                            result && (

                                <Box
                                    key={result.name}
                                    flex="0 0 calc(33% - 1rem)"
                                    // height="500px"
                                    w='100%'
                                    // borderWidth="1px"
                                    borderRadius="md"
                                    overflow="hidden"
                                    mb="2rem"
                                >
                                    
                                    <ChakraText fontWeight="bold" textAlign="center" fontSize='3xl' backgroundColor={bgColor}>
                                        {txt}
                                    </ChakraText>
                                    <Box height="300px" overflow="hidden">
                                        <img
                                            src={result.imageurl}
                                            alt={result.name}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }}
                                        />
                                    </Box>
                                    <Box p="4" flexDirection="column" alignItems="center">
                                        <ChakraText fontWeight="bold" textAlign="center" mb="2">
                                            {result.name}
                                        </ChakraText>
                                        <Button colorScheme={'green'} 
                                                bg={'cyan.400'}
                                                _hover={{
                                                    bg: 'cyan.500',
                                                }}
                                                onClick={() => { setOpenModalId(result.name); onOpen(); }}>
                                            More info
                                        </Button>
                                        <Modal isOpen={isOpen && openModalId === result.name} onClose={() => { setOpenModalId(null); onClose(); }}>

                                            <ModalOverlay />
                                            <ModalContent>
                                                <ModalHeader>{result.name}</ModalHeader>
                                                <ModalCloseButton />
                                                <ModalBody>
                                                    <Text align='justify'>{result.description}</Text>
                                                </ModalBody>
                                                <ModalFooter>
                                                <Button colorScheme={'green'} 
                                                            bg={'cyan.400'}
                                                            _hover={{
                                                                bg: 'cyan.500',
                                                            }} 
                                                            onClick={onClose}>
                                                    Close
                                                </Button>
                                                </ModalFooter>
                                            </ModalContent>
                                        </Modal>
                                    </Box>
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
                                        Please make sure no much clutter in the background.
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
                                        Please make sure no much clutter in the background.
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