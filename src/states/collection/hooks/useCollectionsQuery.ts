import useSWR from "swr";
import { CollectionQueryBody } from "../types";
import { collectionFetch } from "../fetch/fetchCollections";

export const useCollectionQuery = (body: CollectionQueryBody) => {
  console.log("/collections/page/", body);
  // TODO Igor swr key
  const { data, error, isLoading } = useSWR(
    `/collections/page/${body.pageNum}`,
    () => collectionFetch(body)
  );
  return {
    collection: data,
    error,
    isLoading,
  };
};
