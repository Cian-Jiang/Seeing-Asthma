"use client";
import { useState } from 'react';
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
  return (
    <>
        <Divider />
        <br/>
    <Tabs variant='soft-rounded' colorScheme='blue' align="center">
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
