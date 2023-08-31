'use client'
import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
  Box,
    Button,
  chakra,
    Flex,
    HStack,
    ListIcon,
    ListItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
    UnorderedList,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { QuestionIcon } from '@chakra-ui/icons';

interface StatsCardProps {
  title: string
  stat: string
}
function StatsCard(props: StatsCardProps) {


    const { title, stat } = props
  return (
    <Stat
      px={{ base: 4, md: 8 }}
      py={'5'}
      shadow={'xl'}
      border={'1px solid'}
      borderColor={useColorModeValue('gray.800', 'gray.500')}
      rounded={'lg'}>
      <StatLabel fontWeight={'medium'} isTruncated>
        {title}
      </StatLabel>
      <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
        {stat}
      </StatNumber>
    </Stat>
  )
}

export default function Statistics() {
    //age
    const chartRef = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);
    const [chartData, setChartData] = useState({}); // Data for the Chart.js chart
    const [year, setYear] = useState('2020');  // Add this line

    // Fetch data
    useEffect(() => {
        fetch(`/api/getHospitalData?year=${year}&sex=All`)  // Modify this line
            .then((res) => res.json())
            .then((data) => {
                setChartData(processData(data));
            });
    }, [year]);  // Empty dependency array, so this useEffect runs only once

    // Initialize and update chart
    useEffect(() => {
        if (chartRef.current) {
            // @ts-ignore
            const ctx = chartRef.current.getContext('2d');
            if (chartInstance) {
                // @ts-ignore
                chartInstance.destroy();
            }
            // Adding more styling options here
            // @ts-ignore
            if (chartData && Array.isArray(chartData.datasets)) {
                // @ts-ignore
                const styledData = {
                    ...chartData,
                    datasets: (chartData as any).datasets.map((dataset: { label: string; }) => {
                        let borderColor;
                        let backgroundColor;

                        if (dataset.label === 'Male') {
                            borderColor = 'blue';
                            backgroundColor = 'rgba(56,159,231,0.5)';
                        } else if (dataset.label === 'Female') {
                            borderColor = 'red';
                            backgroundColor = 'rgba(239,116,199,0.65)';
                        } else if (dataset.label === 'All') {
                            borderColor = 'black';
                            backgroundColor = 'rgba(0,0,0,0.62)';
                        } else {
                            borderColor = 'gray';  // Default
                            backgroundColor = 'rgba(128, 128, 128, 0.5)';  // Default
                        }

                        return {
                            ...dataset,
                            borderWidth: 2,
                            borderRadius: dataset.label === 'All' ? Number.MAX_VALUE : 5,
                            borderColor: borderColor,
                            backgroundColor: backgroundColor,
                            borderSkipped: false,
                        };
                    })
                };

                const newChartInstance = new Chart(ctx, {
                    type: 'bar',
                    data: styledData,
                });
                // @ts-ignore
                setChartInstance(newChartInstance);
            }
        }

        return () => {
            if (chartInstance) {
                // @ts-ignore
                chartInstance.destroy();
            }
        };
    }, [chartData]);

    const processData = (data: any[]) => {
        // 过滤掉 age_group 为 'All ages' 的数据
        const filteredData = data.filter((item: { age_group: string; }) => item.age_group !== 'All ages');

        // 提取所有唯一的年龄组
        const ageGroups = Array.from(new Set(filteredData.map((item: { age_group: any; }) => item.age_group)));

        // 提取所有唯一的性别
        const sexes = Array.from(new Set(filteredData.map((item: { sex: any; }) => item.sex)));

        // 为每个性别和年龄组准备数据
        const datasets = sexes.map(sex => {
            const sexData = ageGroups.map(age => {
                const entry = filteredData.find((item: { age_group: unknown; sex: unknown; }) => item.age_group === age && item.sex === sex);
                return entry ? entry.number_of_hospitalisations : 0;
            });

            return {
                label: sex,
                data: sexData,
                backgroundColor: sex === 'Male' ? 'red' : (sex === 'Female' ? 'green' : 'blue')
            };
        });

        return {
            labels: ageGroups,
            datasets: datasets
        };
    };
    const symptomsDisclosure = useDisclosure();
    const causesDisclosure = useDisclosure();
    const riskDisclosure = useDisclosure();
    const firstDisclosure = useDisclosure();

    return (
        <Box maxW="7xl" mx={'auto'} pt={5} px={{base: 2, sm: 12, md: 17}}>
            <chakra.h1 textAlign={'center'} fontSize={'4xl'} py={10} fontWeight={'bold'}>
                Statistic about Asthma in Australia
            </chakra.h1>
            <SimpleGrid columns={{base: 1, md: 3}} spacing={{base: 5, lg: 8}}>
                <StatsCard title={'long-term asthmatics'} stat={'11% of Australians'}/>
                <StatsCard title={'Annual health expenditure on asthma'} stat={'$900 million'}/>
                <StatsCard title={'Serious psychological distress caused by asthma'} stat={'11% of people with asthma'}/>
            </SimpleGrid>
            <Box mt={10}>
                <HStack spacing='24px'>
                    <Box mt={10} flexBasis="70%">

                        <chakra.h2 textAlign={'center'} fontSize={'2xl'} py={5} fontWeight={'medium'}>
                            {year} Australian hospital admissions for asthma by age group
                        </chakra.h2>
                        <Select placeholder="Select year" onChange={e => setYear(e.target.value)}>
                            {/* Loop through years 2010 to 2020 and create options */}
                            {Array.from({length: 11}, (_, i) => 2010 + i).map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </Select>
                        <Box mt={10}>
                            <canvas ref={chartRef} width={400} height={200}></canvas>
                        </Box>

                    </Box>

                    <Box mt={10} flexBasis="25%" border="1px" borderColor="gray.300">
                        <img
                            alt={'Hero Image'}
                            src={
                                'https://i.imgur.com/qK5wC1B.jpg'
                            }
                            style={{ width: "100%", height: "auto" }}
                        />
                        <chakra.h2 textAlign={'center'} fontSize={'2xl'} py={5} fontWeight={'medium'}>
                            Key Statistics
                        </chakra.h2>
                        <Accordion allowToggle>
                            <AccordionItem>
                                <h2>
                                    <AccordionButton>
                                        <Box as="span" flex='1' textAlign='left'>
                                            High Incidence in Younger Age Groups
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    The chart distinctly shows that the age groups of 0-4, 5-9, and 10-14 have the
                                    highest rates of hospitalizations due to asthma. The number of cases in these age
                                    brackets is several times to several tens of times higher than in other age groups.
                                    This emphasizes the vulnerability of younger individuals to severe asthma conditions
                                    requiring hospitalization.
                                </AccordionPanel>
                            </AccordionItem>

                            <AccordionItem>
                                <h2>
                                    <AccordionButton>
                                        <Box as="span" flex='1' textAlign='left'>
                                            Decline with Age
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    As age increases, there is a noticeable decline in the number of people hospitalized
                                    due to asthma. This trend suggests that asthma-related hospitalizations become
                                    less frequent with age.
                                </AccordionPanel>
                            </AccordionItem>

                            <AccordionItem>
                                <h2>
                                    <AccordionButton>
                                        <Box as="span" flex='1' textAlign='left'>
                                            Gender-Specific Trends
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    For the age group 0-14, males are more likely to be hospitalized due to asthma
                                    compared to females. However, this trend reverses after the age of 14, where
                                    females are more likely to be hospitalized for asthma conditions.
                                </AccordionPanel>
                            </AccordionItem>


                        </Accordion>
                    </Box>

                </HStack>
            </Box>

        </Box>
    );
}

function processData(data: any): React.SetStateAction<{}> {
    throw new Error('Function not implemented.');
}


