import React, { useMemo, useState } from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
} from '@chakra-ui/react'
import Pagination from '../../components/Tables/Pagination';
import { filterRows, paginateRows, sortRows } from '../../components/Tables/tableHelpers';
import type { Column } from './page';

type props = {
  rows: any[];
  columns: Column[];
}

const TableComponent = ({ rows, columns }: props) => {

  const [activePage, setActivePage] = useState(1)
  const [filters, setFilters] = useState<{ [key: string]: string | number }>({})
  const [sort, setSort] = useState({ order: 'asc', orderBy: 'id' })
  const rowsPerPage = 3

  const filteredRows = useMemo(() => filterRows(rows, filters), [rows, filters])
  const sortedRows = useMemo(() => sortRows(filteredRows, sort), [filteredRows, sort])
  const calculatedRows = paginateRows(sortedRows, activePage, rowsPerPage)

  const count = filteredRows.length
  const totalPages = Math.ceil(count / rowsPerPage)

  const handleSearch = (value: string | number, accessor: string) => {
    setActivePage(1)

    if (value) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [accessor]: value,
      }))
    } else {
      setFilters((prevFilters) => {
        const updatedFilters = { ...prevFilters }
        delete updatedFilters[accessor]

        return updatedFilters
      })
    }
  }

  const handleSort = (accessor: string) => {
    setActivePage(1)
    setSort((prevSort) => ({
      order: prevSort.order === 'asc' && prevSort.orderBy === accessor ? 'desc' : 'asc',
      orderBy: accessor,
    }))
  }

  const clearAll = () => {
    setSort({ order: 'asc', orderBy: 'id' })
    setActivePage(1)
    setFilters({})
    columns.forEach((column) => {
      document.getElementById(`${column.accessor}-search`).value = "";
    })
  }


  return (
    <div className='my-0 mx-auto overflow-visible'>
      <Table className='w-9/10 border-spacing-0 text-left position-relative border-collapse'>
        <Thead>
          <Tr>
            {columns.map(column => {
              const sortIcon = () => {
                if (column.accessor === sort.orderBy) {
                  if (sort.order === 'asc') {
                    return '⬆️'
                  }
                  return '⬇️'
                } else {
                  return '️↕️'
                }
              }

              return (
                <Th key={column.accessor} className='bg-white p-[9px 10px] border-b-1 border-slate-800 border-solid font-bold text-left hover:text-white hover:bg-slate-800 hover:cursor-pointer sticky z-3 top-0' onClick={() => handleSort(column.accessor)}>
                  <span>{column.label}</span>
                  <button>{sortIcon()}</button>
                </Th>
              )
            })}
          </Tr>
          <Tr>
            {columns.map(column => {
              return (
                <Th key={column.accessor}>
                  <Input
                    key={`${column.accessor}-search`}
                    id={`${column.accessor}-search`}
                    type="search"
                    placeholder={`Search ${column.label}`}
                    value={filters[column.accessor]}
                    onChange={event => handleSearch(event.target.value, column.accessor)}
                  />
                </Th>
              )
            })}
          </Tr>
        </Thead>
        <Tbody>
          {calculatedRows.map(row => {
            return (
              <Tr key={row.id} className='first:border-t-none odd:bg-gray-100 even:bg-white hover:text-white hover:bg-gray-400 hover:cursor-pointer'>
                {columns.map(column => {
                  if (column.format) {
                    return <Td key={column.accessor}>{column.format(row[column.accessor])}</Td>
                  }
                  return <Td key={column.accessor}>{row[column.accessor]}</Td>
                })}
              </Tr>
            )
          })}
        </Tbody>
      </Table>
      {count > 0 ? (
        <Pagination
          activePage={activePage}
          count={count}
          rowsPerPage={rowsPerPage}
          totalPages={totalPages}
          setActivePage={setActivePage}
        />
      ) : (
        <p>No data found</p>
      )}

      <div>
        <p>
          <button onClick={clearAll}>Clear all</button>
        </p>
      </div>
    </div>
  )
}

export default TableComponent;