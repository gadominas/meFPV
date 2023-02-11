import { useState } from 'react'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'

import Layout from './components/Layout'
import { Point } from './components/Point'
import { GoogleMap } from './components/maps/GoogleMap'
import { PointData, usePoints } from './components/hooks/usePoints'

import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import Divider from '@mui/material/Divider'

export default function App() {
    const points = usePoints()
    const [point, setPoint] = useState<PointData>()

    return (
        <>
            <Layout>
                <Grid style={{ maxHeight: '100vh' }} container spacing={0}>
                    <Grid item xs={4}>
                        <AppBar position='static'>
                            <Toolbar>
                                <IconButton
                                    size='large'
                                    edge='start'
                                    color='inherit'
                                    aria-label='menu'
                                    sx={{ mr: 2 }}>
                                    <MenuIcon />
                                </IconButton>
                                <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                                    ME FVP
                                </Typography>
                                <Button color='inherit'>close</Button>
                            </Toolbar>
                        </AppBar>
                        <Stack divider={<Divider />} style={{ padding: 12 }} spacing={2}>
                            {!!point && (
                                <>
                                    <Point
                                        key={point.id}
                                        comments={point.comments}
                                        title={point.title}
                                        rating={point.rating}
                                        description={point.description}
                                    />
                                    <Button onClick={() => setPoint(undefined)}>close</Button>
                                </>
                            )}
                            {!point &&
                                points
                                    .slice(0, 4)
                                    .map(p => (
                                        <Point
                                            key={p.id}
                                            comments={p.comments}
                                            title={p.title}
                                            rating={p.rating}
                                            description={p.description}
                                        />
                                    ))}
                        </Stack>
                    </Grid>
                    <Grid style={{ height: '100vh' }} item xs={8}>
                        <GoogleMap onClick={setPoint} />
                    </Grid>
                </Grid>
            </Layout>
        </>
    )
}
