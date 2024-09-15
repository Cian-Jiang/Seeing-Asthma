'use client';
import React from 'react'
import {
  Box,
  Button, ButtonGroup, Card, CardBody, IconButton,
  Modal, ModalBody,
  ModalCloseButton,
  ModalContent, ModalFooter,
  ModalHeader,
  ModalOverlay, Stack,
  Text, useColorMode,
  useDisclosure
} from '@chakra-ui/react';
import {FaMoon, FaSun} from "react-icons/fa";

export default function Gamelink() {

  const {colorMode, toggleColorMode} = useColorMode();

  const symptomsDisclosure = useDisclosure();
  const causesDisclosure = useDisclosure();
  const riskDisclosure = useDisclosure();

  return (
    <>

    <Text textAlign="center" fontSize="4xl" py={10} fontWeight="bold">
        Have fun ~
      </Text>
      <Box position="relative" p={12}>

        <Button onClick={symptomsDisclosure.onOpen}>What are the symptoms?</Button>
        <Modal isOpen={symptomsDisclosure.isOpen} onClose={symptomsDisclosure.onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>What are the symptoms?</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Symptoms associated with thunderstorm asthma include wheeze, chest tightness, difficulty breathing and
              cough. The symptoms can escalate very quickly and may become life threatening.
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={symptomsDisclosure.onClose}>
                Close
              </Button>

            </ModalFooter>
          </ModalContent>
        </Modal>

        <Button onClick={causesDisclosure.onOpen}>What causes thunderstorm asthma?</Button>
        <Modal isOpen={causesDisclosure.isOpen} onClose={causesDisclosure.onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>What causes thunderstorm asthma?</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              The cause of thunderstorm asthma is not fully understood.
              <br/>
              Exposure to high concentrations of very small fragments of pollen appears to be an important part of the cause of thunderstorm asthma.
              <br/>It is thought that moisture in the air during a thunderstorm swells pollen grains which burst, generating tiny fragments of pollen. Airflows in some thunderstorms concentrate these fragments in high numbers at ground level where they may be breathed in and affect people at risk of asthma symptoms.
              <br/>In NSW, high levels of rye grass pollen appear to be associated with thunderstorm asthma in some areas.
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={causesDisclosure.onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>


        <Button onClick={riskDisclosure.onOpen}>Who is at risk?</Button>
        <Modal isOpen={riskDisclosure.isOpen} onClose={riskDisclosure.onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Who is at risk?</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              People with asthma, people with undiagnosed asthma, people with hay fever (allergic rhinitis),
              and especially people who wheeze and sneeze during spring.
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={riskDisclosure.onClose}>
                Close
              </Button>

            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>

    </>

  )
}
