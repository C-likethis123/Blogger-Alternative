/**
 * A wrapper for Joy-UI's Sheet component, which supports loading states
 */
import React from 'react';
import Sheet, { SheetProps } from '@mui/joy/Sheet';
import Box from '@mui/joy/Box';
import CircularProgress from '@mui/joy/CircularProgress';
import Alert from '@mui/joy/Alert';

interface ComponentProps extends SheetProps {
    children: React.ReactNode;
    isLoading: boolean;
    error: Error | null;
}
export default function SheetComponent({
    isLoading,
    children,
    error,
    ...sheetProps
}: ComponentProps) {
    return (
        <Sheet {...sheetProps}>
            {
                isLoading ?
                    <Box sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        < CircularProgress />
                    </Box> :
                    (error ? <Alert color="danger">{error.message}</Alert> : children)
            }
        </Sheet >
    );
};
