import { useMemo, useState } from 'react'

const Table = ({ titles, rows, defaultSorting, rightSection }) => {
    const [sorting, setSorting] = useState(defaultSorting || { column: 0, ascending: true })
    const [filter, setFilter] = useState('')

    const displayedRows = useMemo(() => {
        if (!rows) return null

        const filteredRows = rows.filter((row) =>
            row.some((cell) => cell.toString().trim().toLowerCase().includes(filter.trim().toLowerCase()))
        )

        return filteredRows.sort((aboveRow, belowRow) => {
            const aboveCell = aboveRow[sorting.column]
            const belowCell = belowRow[sorting.column]
            if (aboveCell === undefined || belowCell === undefined) return 0

            let comparisonResult =
                typeof aboveCell === 'number' && typeof belowCell === 'number'
                    ? aboveCell - belowCell
                    : aboveCell.toString().localeCompare(belowCell.toString())

            return sorting.ascending ? comparisonResult : -comparisonResult
        })
    }, [rows, sorting, filter])

    return (
        <div>
            {/* Filter input and right section */}
            <div className="mb-2 py-1 flex gap-2 border-2 rounded-md">
                <form onSubmit={(event) => event.preventDefault()} className="grow">
                    <input
                        type="text"
                        onChange={(e) => setFilter(e.target.value)}
                        value={filter}
                        placeholder="Введите текст для фильтрации..."
                        className="w-full border-d-400 bg-transparent"
                    />
                </form>

                {rightSection && <div>{rightSection}</div>}
            </div>

            {/* Table */}
            <table className="border-2 border-indigo-900">
                {/* Table header */}
                {titles && (
                    <thead className="border-b-2 border-indigo-900 bg-indigo-200 text-indigo-800">
                    <tr>
                        {titles.map((title, index) => (
                            <th key={index} className="border border-indigo-900 p-0">
                                <button
                                    onClick={() =>
                                        setSorting((prev) => ({
                                            column: index,
                                            ascending: prev.column === index ? !prev.ascending : true,
                                        }))
                                    }
                                    className="size-full rounded-none border-none"
                                >
                                    {title}{' '}
                                    <span className="font-mono">
                                            {sorting.column === index ? (sorting.ascending ? '▲' : '▼') : ' '}
                                        </span>
                                </button>
                            </th>
                        ))}
                    </tr>
                    </thead>
                )}

                {/* Table body */}
                {displayedRows && (
                    <tbody>
                    {displayedRows.map((row, index) => (
                        <tr key={index}>
                            {row.map((cell, cellIndex) => (
                                <td
                                    key={cellIndex}
                                    className="border border-indigo-900 px-2 py-1 text-center align-top"
                                >
                                    {typeof cell === 'number' ? cell.toLocaleString('ru') : cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                )}
            </table>
        </div>
    )
}

export default Table