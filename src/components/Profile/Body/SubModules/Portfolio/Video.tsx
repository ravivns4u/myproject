import React from "react";
import NavHead, { INavHeaderProps } from "../Common/NavHead/NavHead";
import DataTable, { IDataTableStatic } from "../Common/DataTable/DataTable";
import Spinner from "../../../../Common/Spinner/Spinner";
import { useAppDispatch, useAppSelector } from "../../../../../redux/app/hooks";
import { getUserAndImagePortfolio } from "../../../../../redux/slices/profile";
import { GridColumns, GridRenderCellParams } from "@mui/x-data-grid";
import classes from "../common.module.scss";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DeletePointer } from "../../../../../redux/interfaces/backend/apis/deleteInterfaces";
import { ImagePortfolioData } from "../../../../../redux/interfaces/backend/apis/ImagePortfolio";
import Avatar from "@mui/material/Avatar";
import { DeleteDataTypes } from "../../Body";
import { EditDataForm } from "../../../../../redux/interfaces/backend/apis";
import { comparitors } from "../constants/comparitors";

const portfolioColumns: GridColumns = [
  {
    field: "video",
    headerName: "Video",
    headerClassName: classes.DataGrid_header,
    flex: 1,
    renderCell: (data: GridRenderCellParams) => {
      return (
        <video
          src={data.row.image}
          muted
          controls
          className={classes.SquareAvatar}
          style={{ objectFit: "cover" }}
        />
      );
    },
  },
  {
    field: "portfolio",
    headerName: "Portfolio Name",
    headerClassName: classes.DataGrid_header,
    flex: 1,
  },
  {
    field: "description",
    headerName: "Description",
    headerClassName: classes.DataGrid_header,
    flex: 1,
  },
  {
    field: "profession",
    headerName: "Profession",
    headerClassName: classes.DataGrid_header,
    flex: 1,
  },
  {
    field: "action",
    headerName: "Action",
    headerClassName: classes.DataGrid_header,
    flex: 1,
    renderCell: (params) => {
      const { row } = params;
      const deleteDataPoints: DeletePointer = {
        imagePath: row.fullPath,
        uid: row.uid,
        collectionId: row.fp,
        deleteOperationType: comparitors.IMAGES,
        isService: false,
      };
      const imageData: ImagePortfolioData = {
        fileName: row.fileName,
        fullPath: row.fullPath,
        textContent: row.description,
        title: row.portfolio,
        generation: row.generation,
        uid: row.uid,
        fp: row.fp,
        image: row.images,
        profession: row.profession,
        category: row.category,
        metadata: row.metadata ?? {},
      };
      return (
        <div className={classes.ActionButtons}>
          <DeleteIcon
            className={classes.ActionIconColor}
            onClick={() => row.deleteData(deleteDataPoints)}
          />
          <EditIcon
            className={classes.ActionIconColor}
            onClick={() => {
              params.row.openEditPrompt(imageData);
            }}
          />
        </div>
      );
    },
  },
];

export interface ImagePortfolioRow {
  id: string | number;
  image: string;
  portfolio: string;
  description: string;
  action: string;
  fp: string;
  fullPath: string;
  fileName: string;
  category:[];
  profession:[];
  openEditPrompt: (data: EditDataForm) => void;
  deleteData: (data: DeleteDataTypes, product?: boolean) => void;
  generation: string;
  uid: string;
}

export interface ImageProps {
  navbarProps: INavHeaderProps;
  externalDataTable: IDataTableStatic;
  pageNumber: number;
  openEditPrompt: (data: EditDataForm) => void;
  deleteData: (
    data: DeleteDataTypes,
    product?: boolean,
    event?: boolean,
    service?: boolean
  ) => void;
}

export default function ImagePortfolio(props: ImageProps) {
  const {
    navbarProps,
    externalDataTable,
    pageNumber,
    openEditPrompt,
    deleteData,
  } = props;
  const {
    signup: { loading },
    user: { firebaseToken, isLoggedIn },
    profile: {
      fetched,
      portfolios: { images },
    },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const fileType = (fileName: string) => {
    return (
      fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length) ||
      fileName
    );
  };

  const filteredImages = images.reduce(function (filtered: any[], option) {
    if (fileType(option?.fileName) == "mp4") {
      filtered.push(option);
    }
    return filtered;
  }, []);

  const rows = filteredImages.map((element, index) => {
    const row: ImagePortfolioRow = {
      id: index,
      image: element.publicUri ?? "",
      portfolio: element.title,
      description: element.textContent,
      action: "",
      fp: element.fp,
      fullPath: element.fullPath,
      fileName: element.fileName,
      profession:element.profession,
      category:element.category,
      openEditPrompt: openEditPrompt,
      deleteData: deleteData,
      generation: element.generation,
      uid: element.uid,
    };
    return row;
  });
  React.useEffect(() => {
    if (isLoggedIn) {
      const lastEntry = (pageNumber + 1) * 5;
      if (lastEntry >= rows.length + 5) {
        dispatch(
          getUserAndImagePortfolio({
            firebaseToken,
            startPoint: 0,
            endPoint: (pageNumber + 1) * 5,
          })
        );
      }
    }
  }, [dispatch, firebaseToken, isLoggedIn, pageNumber, rows.length]);

  return (
    <React.Fragment>
      <NavHead {...navbarProps} />
      {!loading && !fetched ? (
        <DataTable
          columnSchema={portfolioColumns}
          rowValues={rows}
          {...externalDataTable}
        />
      ) : (
        <Spinner />
      )}
    </React.Fragment>
  );
}
