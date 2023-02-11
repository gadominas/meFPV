import { memo, useEffect, useRef, useState } from 'react'
import { Wrapper, Status } from '@googlemaps/react-wrapper'
import { PointData, usePoints } from '../hooks/usePoints'

const render = (status: Status): React.ReactElement => {
    if (status === Status.LOADING) return <h3>{status} ..</h3>
    if (status === Status.FAILURE) return <h3>{status} ...</h3>
    return null
}

function MyMapComponent({ zoom, onClick }: { zoom: number } & GoogleMapProps) {
    const ref = useRef(null)
    const points = usePoints()

    const [center, setCenter] = useState<{ lat: number; lng: number }>()

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            p => setCenter({ lat: p.coords.latitude, lng: p.coords.longitude }),
            console.error,
            {},
        )
    }, [])

    useEffect(() => {
        if (points.length) {
            const google = (window as any).google

            const map = new google.maps.Map(ref.current, {
                center,
                zoom,
            })

            new google.maps.Marker({
                position: { lat: 1, lng: 32 },
                map,
                title: 'point.title',
            })

            const infoWindow = new google.maps.InfoWindow()

            for (const point of points) {
                const marker = new google.maps.Marker({
                    position: { lat: point.lat, lng: point.lng },
                    map,
                    title: point.title,
                })
                marker.addListener('click', () => {
                    console.log(point)
                    infoWindow.close()
                    infoWindow.setContent(marker.getTitle())
                    infoWindow.open(marker.getMap(), marker)
                    onClick(point)
                })
            }
        }
    }, [points])

    return <div style={{ height: '100%' }} ref={ref} id='map' />
}

export interface GoogleMapProps {
    onClick(point: PointData): void
}

export function _GoogleMap(props: GoogleMapProps) {
    const zoom = 11

    return (
        <Wrapper apiKey='AIzaSyAKUjiSW8UkvrKKo9uysP7B56N5TLOpPuY' render={render}>
            <MyMapComponent zoom={zoom} onClick={props.onClick} />
        </Wrapper>
    )
}

export const GoogleMap = memo(_GoogleMap)
