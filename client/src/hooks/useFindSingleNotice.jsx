import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios"

const useFindSingleNotice = (id) => {
 
    const {axiosSecure} = useAxios();

    const {data : notice, error, isLoading} = useQuery({  
        queryKey : ["get-single-notice",id],
        queryFn : async () => {
        const {data} = await axiosSecure.get(`/notice/find-single/${id}`);
        return data
        }
    })
    return { notice, error, isLoading }
}

export default useFindSingleNotice
