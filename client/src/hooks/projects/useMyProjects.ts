import { useQuery } from "@tanstack/react-query";
import { getMyProjectsEndpoint } from "@/api/projects/my";

export function useMyProjects() {
  return useQuery({
    queryKey: ["my-projects"],
    queryFn: () => getMyProjectsEndpoint(),
  });
}
