import React from "react";
import NavHead, { INavHeaderProps } from "../Common/NavHead/NavHead";
import DataTable, { IDataTableStatic } from "../Common/DataTable/DataTable";
import Spinner from "../../../../Common/Spinner/Spinner";
import { useAppDispatch, useAppSelector } from "../../../../../redux/app/hooks";
import { getUserAndImageFeed } from "../../../../../redux/slices/profile";
import { GridColumns, GridRenderCellParams } from "@mui/x-data-grid";
import classes from "../common.module.scss";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DeletePointer } from "../../../../../redux/interfaces/backend/apis/deleteInterfaces";
import { ImageFeedData } from "../../../../../redux/interfaces/backend/apis/ImageFeed";
import Avatar from "@mui/material/Avatar";
import { DeleteDataTypes } from "../../Body";
import { EditDataForm } from "../../../../../redux/interfaces/backend/apis";
import { comparitors } from "../constants/comparitors";

export async function getStaticProps() {
  return { props: { isDark: true } };
}

const feedColumns: GridColumns = [
  {
    field: "image",
    headerName: "Image",
    headerClassName: classes.DataGrid_header,
    flex: 1,

    renderCell: (data: GridRenderCellParams) => {
      return (
        <Avatar
          className={classes.SquareAvatar}
          variant={"square"}
          src={data.row.image}
        />
      );
    },
  },
  {
    field: "description",
    headerName: "Description",
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
      const imageData: ImageFeedData = {
        fileName: row.fileName,
        fullPath: row.fullPath,
        textContent: row.description,
        generation: row.generation,
        uid: row.uid,
        fp: row.fp,
        image: row.image,
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

export interface ImageFeedRow {
  id: string | number;
  image: string;
  description: string;
  action: string;
  fp: string;
  fullPath: string;
  fileName: string;
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

export default function ImageFeed(props: ImageProps) {
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
      feeds: { images },
    },
  } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();
  const fileType = (fileName: string) => {
    return (
      fileName?.substring(fileName?.lastIndexOf(".") + 1, fileName?.length) ||
      fileName
    );
  };

  const filteredImages = images.reduce(function (filtered: any[], option) {
    if (fileType(option?.fileName) != "mp4") {
      filtered?.push(option);
    }
    return filtered;
  }, []);

  const rows = filteredImages?.filter(row => row?.fileType === 'image')?.map((element, index) => {
    const row: any = {
      id: index,
      image: element.publicUri ?? "",
      description: element.textContent,
      action: "",
      fp: element.fp,
      fullPath: element.fullPath,
      fileName: element.fileName,
      openEditPrompt: openEditPrompt,
      deleteData: deleteData,
      generation: element.generation,
      uid: element.uid,
      metadata: element?.metadata
    };
    return row;
  });
  
  React.useEffect(() => {
    console.log("useeffects ")
    if (isLoggedIn) {
      const lastEntry = (pageNumber + 1) * 5;
      // if (lastEntry >= rows.length + 5) {
        dispatch(
          getUserAndImageFeed({          
            firebaseToken
            // startPoint: 0,
            // endPoint: (pageNumber + 1) * 5,
          })
        );
      // }
    }
  }, [dispatch, firebaseToken, isLoggedIn, pageNumber, rows.length]);

  return (
    <React.Fragment>
      <NavHead {...navbarProps} />
      {!loading && !fetched  ? (
        <DataTable
          columnSchema={feedColumns}
          rowValues={rows}
          {...externalDataTable}
        />
      ) : (
        <Spinner />
      )}
    </React.Fragment>
  );
}
