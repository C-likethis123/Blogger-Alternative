import React from "react";

import MarkdownEditor from "../images/markdown-editor.png";

import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Container from '@mui/joy/Container';
import Typography, { typographyClasses } from '@mui/joy/Typography';

export default function Component() {
    return <Container sx={(theme) => ({
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        py: 10,
        gap: 4,
        flexDirection: 'column',
        [theme.breakpoints.up(834)]: {
            flexDirection: 'row',
            gap: 6
        },
        [theme.breakpoints.up(1199)]: {
            gap: 12,
        }
    })}>
        <Box sx={(theme) => ({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            maxWidth: '50ch',
            textAlign: 'center',
            flexShrink: 999,
            [theme.breakpoints.up(834)]: {
                minWidth: 420,
                alignItems: 'flex-start',
                textAlign: 'initial',
            },
            [`& .${typographyClasses.root}`]: {
                // textWrap: 'balance',
            },
        })}>
            <Typography color="primary" fontSize="lg" fontWeight="lg">
                Blogger Alternative
            </Typography>
            <Typography level="h1" fontWeight={"xl"}>An alternative website for managing Google Blogger Posts</Typography>
            <Typography fontSize="lg" textColor="text.secondary" lineHeight="lg">
                Supercharge your writing experience with Markdown support, code highlighting and UML diagrams.
            </Typography>
        </Box>
        <AspectRatio
            ratio={600 / 520}
            variant="outlined"
            maxHeight={300}
            sx={(theme) => ({
                minWidth: 300,
                alignSelf: 'stretch',
                [theme.breakpoints.up(834)]: {
                    alignSelf: 'initial',
                    flexGrow: 1,
                },
                borderRadius: 'sm',
                bgcolor: 'background.level2',
                flexBasis: '50%',
            })}
        >
            <img
                src={MarkdownEditor}
                alt=""
            />
        </AspectRatio>
    </Container>
}