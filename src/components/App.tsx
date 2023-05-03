import {
	QueryClient,
	QueryClientProvider,
} from "react-query"

import Box from "@mui/material/Box"
import BikeList from "./BikeList"

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		}
	}
})

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<Box sx={{ maxWidth: 768, mx: "auto" }}>
				<BikeList />
			</Box>
		</QueryClientProvider >
	)
}

export default App