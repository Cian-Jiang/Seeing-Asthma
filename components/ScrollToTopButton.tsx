"use client"
import { useEffect, useState } from "react";
import { Box, IconButton, useColorModeValue } from "@chakra-ui/react";
import { ArrowUpIcon } from "@chakra-ui/icons";

const ScrollToTopButton = () => {
    const [visible, setVisible] = useState(false);

    const scrollHandler = () => {
        if (window.scrollY > 300) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", scrollHandler);
        return () => {
            window.removeEventListener("scroll", scrollHandler);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const bgColor = useColorModeValue("gray.100", "gray.700");

    return (
        <Box
            position="fixed"
            bottom="2rem"
            right="2rem"
            zIndex="99"
            display={visible ? "block" : "none"}
        >
            <IconButton
                bg={bgColor}
                aria-label="Scroll to top"
                icon={<ArrowUpIcon />}
                onClick={scrollToTop}
            />
        </Box>
    );
};

export default ScrollToTopButton;
