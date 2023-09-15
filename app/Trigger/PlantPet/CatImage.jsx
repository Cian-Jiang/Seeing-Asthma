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
        <Flex justify="center" minHeight="100vh">
        <div style={{ flex: 1}}>
            <Heading marginTop="1">
                <Text textDecoration="none" _hover={{ textDecoration: 'none' }} color={'blue.400'}>
                Cat Image Recognition

                </Text>
            </Heading>
            <div>
                
                    <form onSubmit={handleSubmit}>
                    <div>
                    <>
                        <br/>
                        <Button onClick={onOpen}>Click to view user guide</Button>
                
                        <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>User guide for uploading the picture</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                            <p>PLease make sure no much clutter in the background.</p>
                            <p>Better to place the subject in the center.</p>
                            </ModalBody>
                
                            <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={onClose}>
                                Close
                            </Button>
                            
                            </ModalFooter>
                        </ModalContent>
                        </Modal>
                        <br/>
                    </>
                        
                    </div>
                    <div>
                        <br/>
                        <label htmlFor="image">Image:</label>
                        <input type="file" id="image" accept="image/*" onChange={handleImageChangeAndUpload} />
                        <Box
                            id="image_display"
                            width="512px"
                            height="288px"
                            borderWidth="1px"
                            borderColor="black"
                            backgroundPosition="center"
                            backgroundSize="cover"
                            backgroundRepeat="no-repeat"
                            backgroundImage={hasUploadedImage ? `url(${image})` : 'url(/2.png)'}

                            >
                            {/* 内容 */}
                        </Box>
                        <br/>
                    </div>
                    <div>
                        <Button type="submit">Submit</Button>
                    </div>
                </form>
            </div>

        </div>
        <div style={{ flex: 1}}>
        
            <Box position="relative" p={12}>
            {loading ? (
            <CircularProgress isIndeterminate color='green.300' />
            ) : result?.name ?(
                result && (
                    <Box
                            key={result.name}
                            flex="0 0 calc(33% - 1rem)"
                            height="400px"
                            borderWidth="1px"
                            borderRadius="md"
                            overflow="hidden"
                            mb="2rem"
                        >
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
                                <Button onClick={() => { setOpenModalId(result.name); onOpen(); }}>More info</Button>
                                <Modal isOpen={isOpen && openModalId === result.name} onClose={() => { setOpenModalId(null); onClose(); }}>
    
                                    <ModalOverlay />
                                    <ModalContent>
                                        <ModalHeader>{result.name}</ModalHeader>
                                        <ModalCloseButton />
                                        <ModalBody>{result.description}</ModalBody>
                                        <ModalFooter>
                                            <Button colorScheme="blue" mr={3} onClick={onClose}>
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
                    <p>{result.split('"')[3]}</p>
                ) : (
                    <p>Result will be shown after the image has been uploaded.</p>
                )
            )}
           
            </Box>
            
        </div>
        </Flex>
         
        </>
       
    );
}
