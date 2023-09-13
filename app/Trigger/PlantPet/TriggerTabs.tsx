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
import CatImage from './CatImage'
import PlantImage from './PlantImage'
import DogImage from './DogImage'

export default function TriggerTabs() {
  return (
    <>
    <Tabs variant='soft-rounded' colorScheme='green'>
  <TabList>
    <Tab>Tab 1</Tab>
    <Tab>Tab 2</Tab>
    <Tab>Tab 3</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <CatImage/>
    </TabPanel>
    <TabPanel>
      <PlantImage/>
    </TabPanel>
    <TabPanel>
      <DogImage/>
    </TabPanel>
  </TabPanels>
</Tabs>
    </>
  )
}
