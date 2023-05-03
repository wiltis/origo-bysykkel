import {
	formatDistance,
	useBikeshareData,
} from "../helpers"

import LocationOnIcon from "@mui/icons-material/LocationOn"
import LockOpenIcon from "@mui/icons-material/LockOpen"
import PedalBikeIcon from "@mui/icons-material/PedalBike"

import Button from "@mui/material/Button"
import CircularProgress from "@mui/material/CircularProgress"
import Link from "@mui/material/Link"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

const BikeList = () => {
	const {
		bikeListData,
		isAvailabilityError,
		isAvailabilityFetching,
		isDistanceVisible,
		isStationError,
		isStationFetching,
		refetchStations,
	} = useBikeshareData()

	if (isStationFetching) return <CircularProgress />
	if (!isStationFetching && isStationError) {
		return (
			<>
				<Typography>
					Beklager, nå er det noe som har gått galt! Prøv igjen nå eller senere dersom problemet vedvarer.
				</Typography>
				<Button
					onClick={() => refetchStations()}
					variant="contained"
				>
					Prøv igjen
				</Button >
			</>
		)
	}

	return (
		<>
			{isAvailabilityError && (
				<Typography
					sx={{ boxShadow: "0px 1px 2px 0px", bgcolor: "white", position: "fixed", p: 2, zIndex: 9 }}
				>
					Det ser ut som om vi sliter litt med å hente ut oppdatert data, vi beklager!
				</Typography>
			)}
			<List>
				{isAvailabilityFetching && <CircularProgress sx={{ position: "fixed", top: 32, right: 32 }} />}
				{bikeListData?.map((s, i) => (
					<ListItem
						key={i}
						sx={{ bgcolor: "white", mb: 2, p: 2, borderRadius: 2, width: "100%" }}
					>
						<Stack
							spacing={1}
							width="100%"
						>
							<>
								<Typography fontWeight="bold">
									{s.name}
								</Typography>
								<Typography
									fontSize={14}
									variant="subtitle1"
								>
									{s.address}
								</Typography>
							</>
							<Stack
								alignItems="center"
								direction="row"
							>
								<ListItemIcon>
									<PedalBikeIcon />
								</ListItemIcon>
								<Typography variant="caption">
									Ledige sykler: {s.num_bikes_available} / {s.capacity}
								</Typography>
							</Stack>
							<Stack
								alignItems="center"
								direction="row"
							>
								<ListItemIcon>
									<LockOpenIcon />
								</ListItemIcon>
								<Typography variant="caption">
									Ledige låser: {s.num_docks_available}
								</Typography>
							</Stack>
							{isDistanceVisible && (
								<Stack
									alignItems="center"
									direction="row"
								>
									<ListItemIcon>
										<LocationOnIcon />
									</ListItemIcon>
									<Typography variant="caption">
										Avstand: {formatDistance(s.distance)}
									</Typography>
								</Stack>
							)}
							<Link
								href={`http://maps.google.com/maps?z=12&t=m&q=loc:${s.lat}+${s.lon}`}
								target="_blank"
								rel="noopener noreferrer"
								sx={{ marginLeft: "auto" }}
							>
								Åpne i kart
							</Link>
						</Stack>
					</ListItem>
				))}
			</List>
		</>
	)
}

export default BikeList
