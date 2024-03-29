import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

interface PaginationProps {
    previousPageToken?: string;
    nextPageToken?: string;
    onClickNextPage: React.Dispatch<React.SetStateAction<string | undefined>>;
}
export default function Pagination({ previousPageToken, nextPageToken, onClickNextPage }: PaginationProps) {

    return (
        <Box display={'flex'} justifyContent={'space-between'}>
            <IconButton
                aria-label="previous page"
                variant="outlined"
                color="neutral"
                size="sm"
                disabled={!!!previousPageToken}
                onClick={() => console.log(previousPageToken)}
            >
                <KeyboardArrowLeftIcon />
            </IconButton>
            <IconButton
                aria-label="next page"
                variant="outlined"
                color="neutral"
                size="sm"
                disabled={!!!nextPageToken}
                onClick={() => console.log(nextPageToken)}
            >
                <KeyboardArrowRightIcon />
            </IconButton>
        </Box>
    );
};
