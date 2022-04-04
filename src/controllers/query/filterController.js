import { useState } from "react";

export default function useFilter() {

    const [filterFn, setFilterFn] = useState({ fn: items => {return items}})

    const handleFilter = e => {
        let target = e.target;

        setFilterFn({
            fn: items => {
                if (target === ''){
                    return items;
                }
                else {
                    return items.filter( x=> x.firstName.toLowerCase().includes(target.value))
                }
            }
        })
    }

    const recordsAfterFiltering = (records) => {
        return filterFn.fn(records)
    }
  

    return {
        filterFn,
        setFilterFn,
        handleFilter,
        recordsAfterFiltering
    }
}