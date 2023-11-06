import {
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import classNames from "classnames";
import { useMemo, useState } from "react";
import { useTranslation } from "next-i18next";

import * as S from "./styles";
import { WithdrawTableProps } from "./types";
import { claimedColumns } from "./columns";
import { WithdrawHistorySkeleton } from "./skeleton";

import { ResultFound } from "@/ui/molecules";
import { Icons } from "@/ui/atoms";

export const ClaimedTable = ({
  data,
  loading,
  hasData,
}: {
  data: WithdrawTableProps[];
  loading: boolean;
  hasData: boolean;
}) => {
  const { t } = useTranslation("transfer");

  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo(
    () =>
      claimedColumns([
        t("tableHeader.date"),
        t("tableHeader.name"),
        t("tableHeader.amount"),
        t("tableHeader.transfer"),
      ]),
    [t]
  );
  const table = useReactTable({
    data,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      {loading ? (
        <WithdrawHistorySkeleton />
      ) : hasData ? (
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const getSorted = header.column.getIsSorted();
                  const trClassName = classNames({
                    asc: getSorted === "asc",
                    desc: getSorted === "desc",
                  });
                  const handleSort = () => {
                    const isDesc = getSorted === "desc";
                    header.column.toggleSorting(!isDesc);
                  };
                  const isActionTab = header.id === "date";
                  const theadProps = isActionTab ? { onClick: handleSort } : {};
                  return (
                    <S.Thead
                      key={header.id}
                      className={trClassName}
                      {...theadProps}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {isActionTab && (
                        <div>
                          <Icons.IncreaseFilter />
                        </div>
                      )}
                    </S.Thead>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, ti) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  const lastCell = table.getRowModel().rows.length === ti + 1;
                  const tdClassName = classNames({ last: lastCell });
                  return (
                    <td className={tdClassName} key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <S.EmptyData>
          <ResultFound>{t("resultEmpty")}</ResultFound>
        </S.EmptyData>
      )}
    </>
  );
};