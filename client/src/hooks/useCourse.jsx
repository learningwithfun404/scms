import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useCourse = (searchText) => {
  const { axiosSecure } = useAxios();

  const {
    data: allCourse,
    error,
    isLoading,
    refetch: courseRefetch,
  } = useQuery({
    queryKey: ["course", searchText],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/course/find?search=${searchText}`,
      );
      return data;
    },
  });

  return { allCourse, error, isLoading, courseRefetch };
};

export default useCourse;
