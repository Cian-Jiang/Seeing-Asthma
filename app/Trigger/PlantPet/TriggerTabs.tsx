"use client";
import { useState, useEffect } from 'react';
import {
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Stack,
    Divider,
} from "@chakra-ui/react";
import CatImage from './CatImage'
import PlantImage from './PlantImage'
import DogImage from './DogImage'

export default function TriggerTabs() {
    
    const [tabIndex, setTabIndex] = useState(0);

    useEffect(() => {
        const fullPath = window.location.href;
        const pathSegments = fullPath.split('?');
    
        const lastSegment = pathSegments[pathSegments.length - 1];

        if (lastSegment === 'tab=Dog') {
            setTabIndex(2);
        } else if (lastSegment === 'tab=Cat') {
            setTabIndex(1);
        } else {
            setTabIndex(0);
        }
      }, []); 

    return (
        <>
            <Divider />
            <br/>
            <Tabs 
              variant='soft-rounded' 
              colorScheme='blue' 
              align="center" 
              index={tabIndex} 
              onChange={(index) => setTabIndex(index)}
            >
                <TabList>
                    <Tab>Plant Trigger</Tab>
                    <Tab>Cat Trigger</Tab>
                    <Tab>Dog Trigger</Tab>
                </TabList>
                <br/>
                <Divider />
                <br/>
                <TabPanels>
                    <TabPanel>
                      <PlantImage/>
                    </TabPanel>
                    <TabPanel>
                    <CatImage/>
                    </TabPanel>
                    <TabPanel>
                      <DogImage/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    )
}
