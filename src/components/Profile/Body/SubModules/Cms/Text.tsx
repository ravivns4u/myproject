import React from "react";
import NavHead, { INavHeaderProps } from "../Common/NavHead/NavHead";
import DataTable, { IDataTableStatic } from "../Common/DataTable/DataTable";
import Spinner from "../../../../Common/Spinner/Spinner";
import { useAppDispatch, useAppSelector } from "../../../../../redux/app/hooks";
import { getUserAndImageFeed, getUserAndImageFeed1 } from "../../../../../redux/slices/profile";
import { GridColumns, GridRenderCellParams } from "@mui/x-data-grid";
import classes from "../common.module.scss";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DeletePointer } from "../../../../../redux/interfaces/backend/apis/deleteInterfaces";
import { CaptionFeedData, ImageFeedData } from "../../../../../redux/interfaces/backend/apis/ImageFeed";
import { DeleteDataTypes } from "../../Body";
import { EditDataForm } from "../../../../../redux/interfaces/backend/apis";
import { comparitors } from "../constants/comparitors";

export async function getStaticProps() {
    return { props: { isDark: true } };
  }

const feedColumns: GridColumns = [
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
         collectionId: row.fullPath,
        uid: row.uid,
        imagePath:row.fp,
        deleteOperationType: comparitors.TEXT,
        isService: row.description,


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

      // const imageData: CaptionFeedData = {
      //   fullPath: row.fullPath,
      //   description: row.description,
      //   caption: row.caption,
      //   fp: row.fp,
      //   metadata: row.metadata ?? {},
      // };
      return (
        <div className={classes.ActionButtons}>
          <DeleteIcon
            className={classes.ActionIconColor}
            onClick={() => row.deleteData1(deleteDataPoints)}
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
// console.log(params,"llll");

export interface ImageFeedRow {
  id: string | number;
  description: string;
  action: string;
  fp: string;
  fullPath: string;
  openEditPrompt: (data: EditDataForm) => void;
  deleteData1: (data: DeleteDataTypes, product?: boolean) => void;
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
  deleteData1: (
    data: DeleteDataTypes,
    product?: boolean,
    event?: boolean,
    service?: boolean
  ) => void;
}
const Text = (props: ImageProps) => {
  const {
    navbarProps,
    externalDataTable,
    pageNumber,
    openEditPrompt,
    deleteData,
    deleteData1,

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

  const rows = images.filter(row => row?.fileType === 'text')?.map((element, index) => {
    const row: ImageFeedRow = {
      id: index,
      description: element.textContent,
      action: "",
      fp: element.fp,
      fullPath: element.fullPath,
      openEditPrompt: openEditPrompt,
      deleteData1: deleteData1,
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
          getUserAndImageFeed({          
            firebaseToken
            // startPoint: 0,
            // endPoint: (pageNumber + 1) * 5,
          })
        );
      }
    }
  }, [dispatch, firebaseToken, isLoggedIn, pageNumber, rows.length
  ]);

  return (
    <React.Fragment>
      
      <NavHead {...navbarProps} />
      {!loading && !fetched ? (
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
};

export default Text;
