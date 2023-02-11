import useSWR from 'swr'
import { poi } from '../../api/types/poi'
import { PointProps } from '../Point'
import { v4 } from 'uuid'

export type PointData = PointProps & { id: string; lng: number; lat: number }

export function usePoints(): PointData[] {
    const { data, error, isLoading } = useSWR<poi.Data>(`/api/points.json`, url =>
        fetch(url).then(d => d.json()),
    )

    if (data) {
        return dummy.concat(
            data.features.map(f => {
                return {
                    lat: f.geometry.coordinates[1],
                    lng: f.geometry.coordinates[0],
                    comments: [],
                    description: f.properties.description,
                    id: f.properties.pid || v4(),
                    title: f.properties.Name,
                    rating: { average: 0, count: 0 },
                }
            }),
        )
    }

    return []
}

const dummy = [
    {
        id: '1',
        title: 'Restaurant A',
        description: 'A great place to eat',
        rating: {
            average: 4.5,
            count: 100,
        },
        comments: [
            {
                author: 'John Doe',
                comment: 'I had a fantastic experience at Restaurant A!',
            },
            {
                author: 'Jane Doe',
                comment: 'The food was delicious and the service was top-notch.',
            },
            {
                author: 'Jim Smith',
                comment: 'I will definitely be coming back to Restaurant A!',
            },
        ],
    },
    {
        id: '2',
        title: 'Restaurant B',
        description: 'A great place to have breakfast',
        rating: {
            average: 4.2,
            count: 50,
        },
        comments: [
            {
                author: 'Sarah Johnson',
                comment: 'I loved the breakfast at Restaurant B!',
            },
            {
                author: 'Bob Brown',
                comment: 'The coffee was great and the pancakes were delicious.',
            },
            {
                author: 'Linda Anderson',
                comment: 'I will definitely be coming back to Restaurant B for breakfast!',
            },
        ],
    },
]
