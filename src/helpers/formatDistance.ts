const formatDistance = (distance: number): string => {
	return Math.round(distance * 10) / 10 + "km"
}

export default formatDistance
