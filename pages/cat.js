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
} from "@chakra-ui/react";
import { useEffect } from 'react';

function MyAccordion({ result }) {
    // console.log(result)
    // console.log()
    return (
        <Accordion defaultIndex={[0]} allowMultiple>
            {result.map((item, index) => (
                <AccordionItem key={index}>
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex="1" textAlign="left">
                                {item.description}
                                ({item.score})
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
    );
}

export default function Home() {
    const [image, setImage] = useState([]);
    const [result, setResult] = useState([]);
    const toast = useToast();

    useEffect(() => {
        toast({
            title: "Test",
            description: "This is a test toast",
            status: "info",
            duration: 3000,
            isClosable: true,
        });
    }, []);




    const handleImageChange = (e) => {
        const file = e.target.files[0];
        // 检查文件是否是图片
        if (file && file.type.startsWith('image/')) {
            // 检查文件大小是否小于 4MB
            if (file.size < 4 * 1024 * 1024) {
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
    // if (file) {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onloadend = () => {
    //         setImage(reader.result);
    //     };
    // }
    //};

    const analyzeImage = async () => {
        //const apiKey = process.env.GOOGLE_CLOUD_VISION_API_KEY;
        const apiKey = 'AIzaSyDSixvrSvxTKMKdd0rYO3ogivqSGdlqoRI';

        const url = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;
        //console.log(apiKey)
        const requestPayload = {
            requests: [
                {
                    image: {
                        content: image.split('base64,')[1],
                    },
                    features: [{ type: 'LABEL_DETECTION', maxResults: 50 }],
                },
            ],
        };

        try {
            const { data } = await axios.post(url, requestPayload);
            // 解析返回的 JSON 数据
            const labels = data.responses[0].labelAnnotations;
            // 筛选出概率大于 0.6 的标签
            const filteredLabels = labels.filter((label) => label.score > 0.6);

            // 提取标签的描述和概率，并存储在一个对象数组中
            const labelInfo = filteredLabels.map((label) => ({ description: label.description, score: label.score }));

            // 调用自定义的 Next.js API 路由
            // const res = await axios.post('/api/analyzeImage', { labelInfo });
            // const enrichedLabels = res.data;
            setResult(labelInfo);
        } catch (error) {

            console.error('Error analyzing image:', error.response ? error.response.data : error);
        }
    };

    return (
        <div>
            <h1>Cloud Vision API with Next.js and MySQL</h1>
            <input type="file" onChange={handleImageChange} />
            <button onClick={analyzeImage}>Analyze</button>
            <Box position="relative" p={12}>

                {result && <MyAccordion result={result} />}
            </Box>
        </div>
    );
}
