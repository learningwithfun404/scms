import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios"

const useNotice = () => {
 
    const {axiosSecure} = useAxios();

    const {
        data : allNotice, error,
         refetch : noticeRefetch,
        } = useQuery({  
        queryKey : ["notice"],
        queryFn : async () => {
        const {data} = await axiosSecure.get("/notice/find");
        return data
        }
    })
    return { allNotice, error, noticeRefetch }
}

export default useNotice
