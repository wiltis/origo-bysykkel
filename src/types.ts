export type Station = {
	station_id: string
	name: string
	address: string
	lat: number
	lon: number
	capacity: number
}

export type StationAvailability = {
	is_installed: number
	is_renting: number
	num_bikes_available: number
	num_docks_available: number
	last_reported: number
	is_returning: number
	station_id: string
}

export type Coordinate = {
	lon: number
	lat: number
}

export type BikeListData = {
	address: string
	capacity: number
	distance: number
	lat: number
	lon: number
	name: string
	num_bikes_available: number
	num_docks_available: number
	station_id: string
}

export type StationResponse = {
	last_updated: number,
	data: {
		stations: Station[]
	}
	ttl: string
}

export type StationAvailabilityResponse = {
	last_updated: number,
	data: {
		stations: StationAvailability[],
	}
	ttl: string
}

