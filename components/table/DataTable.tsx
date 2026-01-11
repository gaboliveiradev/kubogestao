"use client";

import { flexRender, Row, ColumnDef } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useModalContext } from "@/context/modal-context";
import { useTable } from "@/hooks/use-table";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon, ArrowRight01Icon, FolderRemoveIcon } from "@hugeicons/core-free-icons";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  FormEdit?: React.ComponentType<{ id: string }>;
  fieldFilter?: string;
  getRowStyle?: (row: Row<TData>) => React.CSSProperties;
  size?: 'sm' | 'md' | 'lg';
}

interface hasId {
  id: string;
}

export function DataTable<TData extends hasId, TValue>({
  columns,
  data,
  FormEdit,
  fieldFilter,
  getRowStyle,
  size = 'sm'
}: DataTableProps<TData, TValue>) {
  const { openModal } = useModalContext();
  const table = useTable<TData, TValue>(data, columns);

  return (
    <div className="w-full">
      {fieldFilter && (
        <div className="flex items-center py-4">
          <Input
            placeholder="Pesquisar"
            value={String(table.getColumn(fieldFilter)?.getFilterValue() ?? "")}
            onChange={(e) => table.getColumn(fieldFilter)?.setFilterValue(e.target.value)}
            className="max-w-sm"
          />
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  style={getRowStyle ? getRowStyle(row) : {}}
                  className={row.index % 2 === 0 ? '' : 'bg-muted'}
                  onDoubleClick={() => FormEdit && openModal(<FormEdit id={row.original.id} />, (size == 'sm') ? 'sm:max-w-[650px]' : (size == 'md') ? 'sm:max-w-[850px]' : 'sm:max-w-[950px]')}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-70 text-center">
                  <Empty>
                    <EmptyHeader>
                      <EmptyMedia variant="icon">
                        <HugeiconsIcon icon={FolderRemoveIcon} />
                      </EmptyMedia>
                      <EmptyTitle>Nenhum Registro Encontrado</EmptyTitle>
                      <EmptyDescription>
                        No momento não há dados para serem exibidos. Por favor, verifique os filtros ou adicione novos registros.
                      </EmptyDescription>
                    </EmptyHeader>
                  </Empty>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          <HugeiconsIcon icon={ArrowLeft01Icon} />
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          <HugeiconsIcon icon={ArrowRight01Icon} />
        </Button>
      </div>
    </div>
  );
}
