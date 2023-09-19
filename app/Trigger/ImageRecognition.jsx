'use client'
import { useState } from 'react';
import axios from 'axios';
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    useToast,
    Button,
    Heading,
    Text,
    Flex,
    CircularProgress,
    SimpleGrid,
    Link,
} from "@chakra-ui/react";
import { useDisclosure,  Text as ChakraText ,  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useColorModeValue, Divider, Center } from "@chakra-ui/react";
import { useEffect } from 'react';

function MyAccordion({ result }) {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const shouldShowButton = result.some(item => ['Dog', 'Flower', 'Cat', 'Plant', 'Tree'].includes(item.name));
        setShowButton(shouldShowButton);
    }, [result]);
    const bgColor = useColorModeValue('blue.50', 'blue.900');

    // console.log(result)
    // console.log()
    return (
        <div>

            <Accordion defaultIndex={[0]} allowMultiple>
            {result.map((item, index) => (
                <AccordionItem key={index}>
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex="1" textAlign="left" color={'blue.400'} fontSize="16px" fontWeight="bold">
                                {item.name}
                                {/*({item.score})*/}
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        {item.objdes}
                    </AccordionPanel>
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

export default function Home() {
    const [image, setImage] = useState([]);
    const [result, setResult] = useState(null);
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const [hasUploadedImage, setHasUploadedImage] = useState(false);

    // useEffect(() => {
    //     toast({
    //         title: "Test",
    //         description: "This is a test toast",
    //         status: "info",
    //         duration: 3000,
    //         isClosable: true,
    //     });
    // }, []);




    const handleImageChange = (e) => {
        const file = e.target.files[0];
        // 检查文件是否是图片
        if (file && file.type.startsWith('image/')) {
            // 检查文件大小是否小于 4MB
            if (file.size < 9 * 1024 * 1024) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    setImage(reader.result);
                    // 显示成功的 Toast
                    toast({
                        title: "Success",
                        description: "File uploaded successfully!",
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                    });
                };
            } else {
                // 显示文件过大的 Toast
                toast({
                    title: "Error",
                    description: "File size should be less than 4MB.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        } else {
            // 显示文件类型错误的 Toast
            toast({
                title: "Error",
                description: "Invalid file type. Please upload an image.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const analyzeImage = async () => {
        setLoading(true); // Set loading state to true

        try {
            const imageData = image.split('base64,')[1];
            const res = await axios.post('/api/proxyGoogleVision', { image: imageData });
            const googleApiResponse = res.data;

            const labels = googleApiResponse.responses[0].labelAnnotations;
            const filteredLabels = labels.filter((label) => label.score > 0.6);
            const labelInfo = filteredLabels.map((label) => ({ description: label.description, score: label.score }));


            // 调用自定义的 Next.js API 路由
            const res2 = await axios.post('/api/analyzeImage', { labelInfo });
            const enrichedLabels = res2.data;
            //if data is empty, show a sentence
            setResult(enrichedLabels);
        } catch (error) {
            console.error('Error analyzing image:', error.response ? error.response.data : error);
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
      const handleGeneralImageChangeAndUpload = (e) => {
        handleImageChange(e); // 调用 handleImageChange 函数
        const file = e.target.files[0];
        handleImageUpload(file); // 调用 handleImageUpload 函数
      };

      useEffect(() => {
        if (uploadedImage) {
            // uploadedImage已更新，设置背景图像
            document.getElementById("general_image_display").style.backgroundImage = `url(${uploadedImage})`;
        }
    }, [uploadedImage]);


    return (
        <>


            <SimpleGrid minChildWidth='320px' spacing='40px' m={5}>

                <Box position="relative"
                     p={3}
                     height='550px'
                     borderWidth='1px' borderRadius='lg' overflow='hidden'
                     display="flex"
                     flexDirection="column"
                     alignItems="center" 
                     justifyContent="center"
                >

                    <ChakraText fontSize='3xl' color={'blue.400'}  as='b'>
                        Upload an indoor or outdoor image
                        <br/>
                    </ChakraText>
                    <br/>
                    <form style={{ display: 'flex', alignItems: 'center' }}>
                        <label htmlFor="image">Image:</label>
                        <input type="file" id="image" accept="image/*" onChange={handleGeneralImageChangeAndUpload} />
                    </form>

                    <Box
                        id="general_image_display"
                        w='100%'
                        h='300px'
                        borderWidth="1px"
                        borderColor="black"
                        backgroundPosition="center"
                        backgroundSize="cover"
                        backgroundRepeat="no-repeat"
                        backgroundImage={hasUploadedImage ? `url(${image})` : 'url(/2.png)'}

                    >

                    </Box>
                    <br/>
                    <form>
                    <Button onClick={analyzeImage}>Analyze</Button>
                    </form>
                    




                </Box>

                <Box position="relative"
                     p={3}
                      height='550px'
                      borderWidth='1px' borderRadius='lg'
                     overflow='hidden'
                     // display='flex'
                     alignItems='center'
                     justifyContent='center'
                >
                         {loading ? (
                            <CircularProgress isIndeterminate color='green.300' />
                        ) : (
                            <>
                                {hasUploadedImage ? (
                    result !== null ? (
                        result.length > 0 ? (
                            <MyAccordion result={result} />
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
                                    No result found.

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
                )}
                            </>
                        )}

                    </Box>

            </SimpleGrid>


        </>
       
    );
    
}