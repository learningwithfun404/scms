import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useCourse = () => {
  const { axiosSecure } = useAxios();

  const {
    data: allCourse,
    error,
    isLoading,
    refetch: courseRefetch,
  } = useQuery({
    queryKey: ["course"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/course/find");
      return data;
    },
  });

  return { allCourse, error, isLoading, courseRefetch };
};

export default useCourse;
