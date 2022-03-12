import * as yup from "yup"

export default class TrackSchema {
    public static track: yup.SchemaOf<TrackDto> = yup.object({
        trackingId: yup.string().required(),
    })
}

export interface TrackDto {
    trackingId: string
}