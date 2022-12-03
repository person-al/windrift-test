import * as React from 'react'
import { Box, Center } from '@chakra-ui/layout'

export default function ChapterPage({ children }) {
    return (
        <Center>
            <Box width="70%" textAlign="left">
                {children}
            </Box>
        </Center>
    )
}
