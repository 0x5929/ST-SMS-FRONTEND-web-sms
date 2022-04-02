import { useState } from 'react'

export default function usePagination() {


    // paging
    const pages = [5, 10, 25]
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(pages[page])

  return {
    pages,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage
  }
}
