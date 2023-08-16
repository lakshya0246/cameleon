import {
  ColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { title } from "radash";

type Props<T> = {
  columnHelper: ColumnHelper<T>;
  data: T[];
  specialColumns?: Partial<
    Record<keyof T, { cell: (info: any) => any; header?: string }>
  >;
  omittedColumns?: (keyof T)[];
};

export function Table<T extends Record<string, any>>(props: Props<T>) {
  const columns: any[] = Boolean(props.data.length)
    ? //   TODO: make the types correct
      Object.keys(props.data[0])
        .filter((key) => !props.omittedColumns?.includes?.(key))
        .map((column) =>
          props.columnHelper.accessor(column as any, {
            header: props.specialColumns?.[column]?.header ?? title(column),
            cell:
              props.specialColumns?.[column as any]?.cell ??
              ((info) => info.getValue()),
          })
        )
    : [];
  const tableInstance = useReactTable({
    columns,
    data: props.data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <table>
      <thead>
        {tableInstance.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {tableInstance.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td style={{ border: "1px solid gainsboro" }} key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
