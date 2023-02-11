export namespace poi {
    export interface Feature {
        type: 'Feature'
        properties: {
            Name: string
            description: string
            pid: string
            poi_name: string
            Date_added: string
            gx_media_links: string
        }
        geometry: {
            type: 'Point'
            coordinates: [number, number]
        }
    }

    export interface Data {
        features: Feature[]
    }
}
