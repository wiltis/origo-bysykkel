import { useState } from "react"
import { useQuery } from "react-query"

import type {
	BikeListData,
	Coordinate,
	StationResponse,
	StationAvailabilityResponse,
} from "../types"

import {
	fetchBikeshareData,
	getDistanceFromLatLonInKm,
} from "../helpers"

const defaultCoordinate = { lon: 10.748392, lat: 59.9112785 }	// Default to Jernbanetorget
const refetchInterval = 10000 									// ms

const useBikeshareData = () => {
	const [coordinates, setCoordinates] = useState<Coordinate>(defaultCoordinate)
	const [isDistanceVisible, setIsDistanceVisible] = useState(false)
	navigator.geolocation.getCurrentPosition(pos => {
		setIsDistanceVisible(true)
		setCoordinates({
			lon: pos.coords.longitude,
			lat: pos.coords.latitude,
		})
	},
		() => setIsDistanceVisible(false)
	)

	const {
		data: availabilityData,
		isFetching: isAvailabilityFetching,
		isError: isAvailabilityError,
	} = useQuery(
		"availability",
		async (): Promise<StationAvailabilityResponse> => await fetchBikeshareData({ path: "station_status.json" }),
		{ refetchInterval: refetchInterval }
	)

	const {
		data: stationData,
		isFetching: isStationFetching,
		isError: isStationError,
		refetch: refetchStations,
	} = useQuery(
		"station",
		async (): Promise<StationResponse> => await fetchBikeshareData({ path: "station_information.json" }),
	)

	const bikeListData: BikeListData[] = stationData?.data?.stations.map(s => {
		const currentAvailability = availabilityData?.data?.stations.find(sa => sa.station_id === s.station_id)

		return ({
			address: s.address,
			capacity: s.capacity,
			distance: getDistanceFromLatLonInKm(coordinates.lat, coordinates.lon, s.lat, s.lon),
			lat: s.lat,
			lon: s.lon,
			name: s.name,
			num_bikes_available: currentAvailability?.num_bikes_available ?? 0,
			num_docks_available: currentAvailability?.num_docks_available ?? 0,
			station_id: s.station_id,
		})
	}).sort((a, b) => a.distance - b.distance) ?? []

	return {
		bikeListData,
		isAvailabilityError,
		isAvailabilityFetching,
		isDistanceVisible,
		isStationError,
		isStationFetching,
		refetchStations,
	}
}

export default useBikeshareData