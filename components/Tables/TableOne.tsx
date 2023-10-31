import Pagination from "@/app/table/Pagination";
import { PLAYER_DATA } from "@/app/table/data";
import { filterRows, paginateRows, sortRows } from "@/app/table/tableHelpers";
import { BRAND } from "@/types/brand";
import { Input, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import Image from "next/image";
import { useMemo, useState } from "react";


export type Column = {
  accessor: string;
  label: string;
  format?: (value: any) => any;
}

const columns: Column[] = [
  { accessor: 'first_name', label: 'First Name' },
  { accessor: 'last_name', label: 'Last Name' },
  { accessor: 'positions', label: 'Position' },
  { accessor: 'email', label: 'Email' },
  { accessor: 'phone', label: 'Phone' },
  { accessor: 'goals_scored', label: 'Goals Scored' },
  { accessor: 'assists', label: 'Assists' },
  { accessor: 'minutes_played', label: 'Minutes Played' },
  { accessor: 'shots_on_goal', label: 'Shots On Goal' },
  { accessor: 'shots_off_target', label: 'Shots Off Target' },
  { accessor: 'pass_completion_percent', label: 'Pass Completion %', format: value => `${value * 100}%` },
  { accessor: 'tackles', label: 'Tackles' },
  { accessor: 'interceptions', label: 'Interceptions' },
  { accessor: 'fouls_committed', label: 'Fouls Committed' },
  { accessor: 'fouls_received', label: 'Fouls Received' },
  { accessor: 'yellow_cards', label: 'Yellow Cards' },
  { accessor: 'red_cards', label: 'Red Cards' },
  { accessor: 'saves', label: 'Saves' },
  { accessor: 'clean_sheets', label: 'Clean Sheets' },
  { accessor: 'height', label: 'Height' },
  { accessor: 'weight', label: 'Weight' },
  { accessor: 'distance_covered', label: 'Distance Covered (km)' },
  { accessor: 'speed_forty_yards', label: 'Forty Yard Dash' },
  { accessor: 'endurance_beep_test', label: 'Beep Test' },
  { accessor: 'strength_bench_press', label: 'Bench Press' },
]


const TableOne = () => {
  const rows = [...PLAYER_DATA]

  console.log(rows, columns)

  const [activePage, setActivePage] = useState(1)
  const [filters, setFilters] = useState<{ [key: string]: string | number }>({})
  const [sort, setSort] = useState({ order: 'asc', orderBy: 'id' })
  const rowsPerPage = 25

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
    <div className="h-full container mx-auto p-6">
      <div className="h-full max-w-full overflow-x-auto">
        <table className="bg-white border border-gray-300 table-auto">
          <thead className="sticky z-3 top-0 bg-white border-b">
            <tr>
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
                  <th key={column.accessor} className="py-2 px-4 border-b min-w-[250px] w-fit" onClick={() => handleSort(column.accessor)}>
                    <span>{column.label}</span>
                    <button>{sortIcon()}</button>
                  </th>
                )
              })}
            </tr>
            <tr>
              {columns.map(column => {
                return (
                  <th key={column.accessor} className="py-2 px-4 border-b">
                    <Input
                      key={`${column.accessor}-search`}
                      id={`${column.accessor}-search`}
                      type="search"
                      placeholder={`Search ${column.label}`}
                      value={filters[column.accessor]}
                      onChange={event => handleSearch(event.target.value, column.accessor)}
                    />
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
              {calculatedRows.map(row => {
                return (
                  <tr key={row.id} className="max-h-[250px] overflow-auto">
                    {columns.map(column => {
                      if (column.format) {
                        return <td key={column.accessor} className="py-2 px-4 border-b">{column.format(row[column.accessor])}</td>
                      }
                      return <td key={column.accessor} className="py-2 px-4 border-b">{row[column.accessor]}</td>
                    })}
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
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
  );
};

export default TableOne;
