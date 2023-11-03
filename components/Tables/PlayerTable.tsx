"use client"

import Pagination from "@/components/Tables/Pagination";
import PLAYER_DATA from "@/app/assets/data.json";
import { filterRows, paginateRows, sortRows } from "@/components/Tables/tableHelpers";
import { BRAND } from "@/types/brand";
import { Box, Heading, Input, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import Image from "next/image";
import { useMemo, useState } from "react";


export type Column = {
  accessor: string;
  label: string;
  sortable?: boolean,
  searchable?: boolean, 
  format?: (value: any) => any;
}

const columns: Column[] = [
  { accessor: 'first_name', sortable: true, searchable: true, label: 'First Name' },
  { accessor: 'last_name', sortable: true, searchable: true, label: 'Last Name' },
  { accessor: 'positions', sortable: true, searchable: true, label: 'Position' },
  { accessor: 'email', sortable: true, searchable: true, label: 'Email' },
  { accessor: 'phone', sortable: true, searchable: true, label: 'Phone' },
  { accessor: 'goals_scored', sortable: true, searchable: true, label: 'Goals Scored' },
  { accessor: 'assists', sortable: true, searchable: true, label: 'Assists' },
  { accessor: 'minutes_played', sortable: true, searchable: true, label: 'Minutes Played' },
  { accessor: 'shots_on_goal', sortable: true, searchable: true, label: 'Shots On Goal' },
  { accessor: 'shots_off_target', sortable: true, searchable: true, label: 'Shots Off Target' },
  { accessor: 'pass_completion_percent', sortable: true, searchable: true, label: 'Pass Completion %', format: value => `${Math.floor(value * 100)}%` },
  { accessor: 'tackles', sortable: true, searchable: true, label: 'Tackles' },
  { accessor: 'interceptions', sortable: true, searchable: true, label: 'Interceptions' },
  { accessor: 'fouls_committed', sortable: true, searchable: true, label: 'Fouls Committed' },
  { accessor: 'fouls_received', sortable: true, searchable: true, label: 'Fouls Received' },
  { accessor: 'yellow_cards', sortable: true, searchable: true, label: 'Yellow Cards' },
  { accessor: 'red_cards', sortable: true, searchable: true, label: 'Red Cards' },
  { accessor: 'saves', sortable: true, searchable: true, label: 'Saves', format: value => value ? value : 'N/A' },
  { accessor: 'clean_sheets', sortable: true, searchable: true, label: 'Clean Sheets', format: value => value ? value : 'N/A' },
  { accessor: 'height', label: 'Height', format: value => value ? `${value.feet}' ${value.inches}"` : 'n/a'},
  { accessor: 'weight', sortable: true, searchable: true, label: 'Weight' },
  { accessor: 'distance_covered', sortable: true, searchable: true, label: 'Distance Covered (km)' },
  { accessor: 'speed_forty_yards', sortable: true, searchable: true, label: 'Forty Yard Dash' },
  { accessor: 'endurance_beep_test', sortable: true, searchable: true, label: 'Beep Test' },
  { accessor: 'strength_bench_press', sortable: true, searchable: true, label: 'Bench Press' },
]


const PlayerTable = () => {
  const rows = useMemo(() => PLAYER_DATA, [])

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
      (document.getElementById(`${column.accessor}-search`) as HTMLInputElement).value = "";
    })
  }

  return (
    <div className="h-full container mx-auto p-6">
      <Box height='675px' overflow={'auto'}>
        <Table style={{ position: 'relative', width: '100%'}} className="border-separate border-spacing-0">
          <Thead style={{ position: 'sticky', zIndex: '4', top: '0', backgroundColor: '#1a222c' }}>
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
                  <Th key={column.accessor} className="border-white min-w-[250px] w-full h-full z-40">
                      <div className='text-white w-full flex items-center gap-5 cursor-pointer' onClick={() => column.sortable && handleSort(column.accessor)}>
                        <Heading size='sm'>{column.label}</Heading>
                        {column.sortable && <button className="text-lg">{sortIcon()}</button>}
                      </div>
                      {column.searchable && <Input
                        key={`${column.accessor}-search`}
                        id={`${column.accessor}-search`}
                        type="search"
                        placeholder={`Search ${column.label}`}
                        value={filters[column.accessor]}
                        onChange={event => column.searchable && handleSearch(event.target.value, column.accessor)}
                      />}
                  </Th>
                )
              })}
            </Tr>
          </Thead>
          <Tbody>
            {calculatedRows.map(row => {
              return (
                <Tr key={row.id} className="max-h-[250px] overflow-auto dark:hover:bg-slate-500 hover:bg-slate-800 hover:text-white">
                  {columns.map(column => {
                    if (column.format) {
                      return <Td key={column.accessor} className="py-2 px-4 border-b">{column.format(row[column.accessor])}</Td>
                    }
                    return <Td key={column.accessor} className="py-2 px-4 border-b">{row[column.accessor]}</Td>
                  })}
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </Box>
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

export default PlayerTable;
