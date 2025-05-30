import { LatLng } from '@autospace/util/types'
import polyline from '@mapbox/polyline'
import Image from 'next/image'

export const StaticMapDirections = ({
  start,
  end,
  padding = [100, 100, 100],
  coordinates,
  className = 'w-full shadow-xl aspect-square',
}: {
  start: LatLng
  end: LatLng
  padding?: [number, number, number]
  coordinates: [number, number][]
  className?: string
}) => {
  // Check if start and end are the same location
  const isSameLocation = start.lat === end.lat && start.lng === end.lng

  if (!coordinates.length || isSameLocation) {
    // If no coordinates or same location, show a single pin map
    const position = start // Use start position for the single pin
    const offset = 0.001 // Small offset to create a valid bounding box

    // Use Mapbox's default streets style instead of custom style
    const url = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-s+000(${
      position.lng
    },${position.lat})/[${position.lng - offset},${position.lat - offset},${
      position.lng + offset
    },${position.lat + offset}]/600x600?padding=${padding.join(
      ',',
    )}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`

    return (
      <Image
        width={300}
        height={300}
        src={url}
        alt="Map"
        className={`${className}`}
      />
    )
  }

  const encodedPolyline = polyline.fromGeoJSON({
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates,
    },
    properties: {},
  })

  // Add a small offset if bounding box has no area
  const minLng = Math.min(start.lng, end.lng)
  const minLat = Math.min(start.lat, end.lat)
  const maxLng = Math.max(start.lng, end.lng)
  const maxLat = Math.max(start.lat, end.lat)

  // Ensure bounding box has some area
  const offset = 0.001
  const boundingBox = [
    minLng === maxLng ? minLng - offset : minLng,
    minLat === maxLat ? minLat - offset : minLat,
    maxLng === minLng ? maxLng + offset : maxLng,
    maxLat === minLat ? maxLat + offset : maxLat,
  ].join(',')

  const paddingString = padding.join(',')

  // Use Mapbox's default streets style instead of custom style
  const url = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-s-a+000(${
    start.lng
  },${start.lat}),pin-s-b+000(${end.lng},${
    end.lat
  }),path-2+000(${encodeURIComponent(
    encodedPolyline,
  )})/[${boundingBox}]/600x600?padding=${paddingString}&access_token=${
    process.env.NEXT_PUBLIC_MAPBOX_TOKEN
  }`

  return (
    <Image
      width={300}
      height={300}
      src={url}
      alt="Map"
      className={` ${className}`}
    />
  )
}
