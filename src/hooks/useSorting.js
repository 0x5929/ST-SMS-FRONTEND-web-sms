
import { useState } from "react";


export default function useSorting () {

  const [order, setOrder] = useState()
  const [orderBy, setOrderBy] = useState()


  const handleSortRequest = (cellId) =>{
      // first, check current state (if the column has been clicked before and if the order is ascending)
      const isAscending = orderBy === cellId && order === 'asc';
      
      // set the order to either asc for ascending or desc for descending
      setOrder(isAscending?'desc':'asc')

      // lastly  set the order by of the current selected column
      setOrderBy(cellId)

  }

  // below three functions are copied directly from mui, and is for sorting purpose
  function descendingComparator(a, b, orderBy) {
      if (b[orderBy] < a[orderBy]) {
        return -1;
      }
      if (b[orderBy] > a[orderBy]) {
        return 1;
      }
      return 0;
    }
    
    function getComparator(order, orderBy) {
      return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
    }


  // This method is created for cross-browser compatibility, if you don't
  // need to support IE11, you can use Array.prototype.sort() directly
  function stableSort(array, comparator) {
      const stabilizedThis = array.map((el, index) => [el, index]);
      stabilizedThis.sort((a, b) => {
          const order = comparator(a[0], b[0]);
          if (order !== 0) {
          return order;
          }
          return a[1] - b[1];
      });
      return stabilizedThis.map((el) => el[0]);
  }


  const recordsAfterSorting = (recordsAfterPaging) => {
      return stableSort(recordsAfterPaging, getComparator(order, orderBy))
  }

  return {
    
    order,
    orderBy,
    handleSortRequest,
    recordsAfterSorting
  }
}