import { useSearchParams } from "react-router-dom";
import { useFilterStoreActions } from "./useFilterStoreActions";
import { FilterSorting } from "../filterStore";
import { NFTSaleStatus } from "@/states/types";
import { useEffect } from "react";

export function useDefaultsFromURL() {
  const [params] = useSearchParams();
  const actions = useFilterStoreActions();
  useEffect(() => {
    actions.setCollectionID(params.get('collectionID') ?? '')
    actions.setSearch(params.get('search') ?? '')
    actions.setMinPrice(params.get('minPrice') ?? '')
    actions.setMaxPrice(params.get('maxPrice') ?? '')
    actions.setSort(params.get('sort') as `${FilterSorting}` ?? 'RECENTLY_ADDED')
    actions.setStatus(params.get('status') as `${NFTSaleStatus.AUCTION}` | `${NFTSaleStatus.FIXED_PRICE}` ?? 'FIXED_PRICE')
  }, [])
}
