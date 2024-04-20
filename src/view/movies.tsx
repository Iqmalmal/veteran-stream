import { useLocation } from "react-router-dom"
import { Box, Text } from "utils/theme"

export const Movie = () => {
    const location = useLocation()

    const searchQuery = location.state.searchQuery || ""

    return(
        <Box>
            <Text variant="text3Xl" color="black">Welcome To The Movies Screen</Text>
            <Text variant="text3Xl" color="black">Showing result for {searchQuery}</Text>

        </Box>
    )

}