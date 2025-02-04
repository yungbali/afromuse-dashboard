import React from "react";

export interface Column<T> {
  accessorKey?: keyof T;
  header: string | ((props: { column: any }) => React.ReactNode);
  id?: string;
  cell?: (props: { row: { original: T } }) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onSearch?: (value: string) => void;
  searchPlaceholder?: string;
  initialSort?: { id: string; desc: boolean };
}

export function DataTable<T extends object>({ columns, data }: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full table-zebra">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={(col.id || (col.accessorKey as string)) ?? Math.random().toString()}
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                {typeof col.header === "function" ? col.header({ column: col }) : col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col) => (
                <td
                  key={(col.id || (col.accessorKey as string)) ?? Math.random().toString()}
                  className="px-6 py-4 whitespace-nowrap"
                >
                  {col.cell
                    ? col.cell({ row: { original: row } })
                    : col.accessorKey
                    ? String(row[col.accessorKey])
                    : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function DataTableColumnHeader({ column, title }: { column: any; title: string }) {
  return <span>{title}</span>;
}