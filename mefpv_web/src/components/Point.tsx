import { Grid } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Rating from '@mui/material/Rating'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { blueGrey } from '@mui/material/colors'

type Comment = {
    author: string
    comment: string
}

type Rates = {
    average: number
    count: number
}

export interface PointProps {
    title: string
    description: string
    rating: Rates
    comments: Comment[]
}

export const Point: React.FunctionComponent<PointProps> = ({
    title,
    description,
    rating,
    comments,
}) => {
    const lastComment = comments[comments.length - 1]
    return (
        <Grid container>
            <Grid xs={8} item>
                <Stack>
                    <Typography
                        gutterBottom
                        variant='subtitle2'
                        component='h6'
                        style={{ margin: 0 }}>
                        {title}
                    </Typography>
                    <Stack direction='row'>
                        <Rating
                            size={'small'}
                            precision={0.5}
                            name='read-only'
                            value={rating.average}
                            readOnly
                        />
                        <Typography variant='caption' color='text.secondary'>
                            ({rating.count})
                        </Typography>
                    </Stack>
                    <Typography variant='caption' color='text.primary'>
                        {description}
                    </Typography>
                    {lastComment && (
                        <Stack alignItems={'center'} direction='row' gap={1}>
                            <Avatar
                                alt={lastComment.author}
                                sx={{ bgcolor: blueGrey[500], width: 18, height: 18 }}
                            />
                            <Typography variant='caption' color='text.secondary'>
                                "{lastComment.comment}"
                            </Typography>
                        </Stack>
                    )}
                </Stack>
            </Grid>
            <Grid xs={4} item>
                <div>
                    <img width='100%' src='/test.jpg' style={{ borderRadius: 8 }} />
                </div>
            </Grid>
        </Grid>
    )
}
