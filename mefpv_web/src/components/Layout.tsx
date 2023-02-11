import React from 'react'

import Box from '@mui/material/Box'

export default function App({ children }: React.PropsWithChildren) {
    return (
        <Box style={{ height: '100vh' }} sx={{ flexGrow: 1 }}>
            {children}
        </Box>
    )
}
