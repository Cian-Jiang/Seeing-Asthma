"use client";
import { useState } from 'react';
import {
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Stack,
} from "@chakra-ui/react";

export default function Upload() {
    const [image, setImage] = useState(null);
    const [type, setType] = useState('Plant');
    const [result, setResult] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleTypeChange = (e) => {
        setType(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

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
        }
    };

    return (
        <>
        <Stack>
        align={'center'}
        <h1>Image Recognition</h1>
        <Tabs variant='soft-rounded' colorScheme='green'>
        <TabList>
            <Tab>Tab 1</Tab>
            <Tab>Tab 2</Tab>
            <Tab>Tab 3</Tab>
        </TabList>
        <TabPanels>
            <TabPanel>
            <div>
                <h1>Image Recognition</h1>
                <form onSubmit={handleSubmit}>
                <div>
                                        <label htmlFor="type">Type: Cat</label>
                                    </div>
                <div>
                    <label htmlFor="image">Image:</label>
                    <input type="file" id="image" accept="image/*" onChange={handleImageChange} />
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
            {result && (
                <div>
                    <h2>Result:</h2>
                    <pre>{JSON.stringify(result, null, 2)}</pre>
                </div>
            )}

            </div>
            </TabPanel>
            <TabPanel>
            <div>
                <h1>Image Recognition</h1>
                
               
            </div>
            </TabPanel>
            <TabPanel>
            <p>Three!</p>
            </TabPanel>
        </TabPanels>
        </Tabs>
        </Stack>
         
        </>
       
    );
}
