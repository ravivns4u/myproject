import React from 'react';
import classes from './DataTable.module.scss';
import { DataGrid, GridColumns, GridRowModel } from '@mui/x-data-grid';
import { Box } from "@mui/material";

export interface IDataTableStatic {
  pageSize: number;
  rowHeight: number | undefined;
  pageNumber: number;
  setPageNumber: (pageNumber: number) => void;
  setActiveRowIds: (activeRowIds: string[]) => void;
  setActiveRowEmail?:any
}

export interface IDataTableDynamic {
  columnSchema: GridColumns;
  rowValues: GridRowModel[];
}
export default function DataTable(props: IDataTableStatic & IDataTableDynamic) {
  const {
    columnSchema,
    rowValues,
    pageSize,
    pageNumber,
    rowHeight,
    setPageNumber,
    setActiveRowIds,
    setActiveRowEmail,
  } = props;
  return (
      <Box className={classes.DataGridBox} sx={{
        overflowX:'auto',
        minHeight: '520px',
        height:'auto',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <DataGrid
          className={classes.DataGrid}
          columns={columnSchema}
          rows={rowValues}
          pageSize={pageSize}
          page={pageNumber}
          rowsPerPageOptions={[pageSize]}
          rowHeight={rowHeight}
          disableSelectionOnClick
          onPageChange={setPageNumber}
          onCellClick={(props) => {
              setActiveRowIds([props.id as string])
              setActiveRowEmail([props?.row?.email])
          }}
          onSelectionModelChange={(ids) => {
            try {
              const selectedIDs = new Set(ids);
              setActiveRowIds([...selectedIDs] as string[]);
            } catch (e) {}
          }}
        />
      </Box>
  );
}
