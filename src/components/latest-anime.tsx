import { Pressable, StyleSheet } from "react-native"
import { Box, Text } from "utils/theme"
import { META } from "@consumet/extensions"
import Input from "./shared/Input"
import { Controller, useForm } from "react-hook-form"


 const {
    control,
    handleSubmit,
    formState: { errors },
} = useForm<ISearch>({
    defaultValues: {
        title: "",
    },
}) 
    



const onSubmit = (data: ISearch) => {
    console.log(data)
}

const LatestAnime = () => {
    return (
        <Box>            
            <Text mb="3.5">Latest Anime</Text>

            <Input label="Search Anime" placeholder="Search..." />
            <Box>
                <Pressable onPress={onSubmit}>
                    <Text textAlign="center" variant="textXs" fontWeight="700" color="gray5" >
                        Search
                    </Text>
                </Pressable>
            </Box>
        </Box>
    )
}

export default LatestAnime

const styles = StyleSheet.create({
    
})