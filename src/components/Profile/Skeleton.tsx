import React, { ReactElement, useState, useEffect } from "react";
import SideBar from "./Sidebar/Sidebar";
import classes from "./Skeleton.module.scss";
import Body, { DeleteEventType, DeleteDataTypes } from "./Body/Body";
import EditPrompt from "../Common/MUIComponents/DialogPrompt/EditPrompt/EditIndividual";
import PortfolioPrompt from "../Common/MUIComponents/DialogPrompt/EditPrompt/PortfolioPrompt";
import DeleteImagePrompt from "../Common/MUIComponents/DialogPrompt/EditProfile/DeletePrompt/DeleteImage";
import FeedPrompt from "../Common/MUIComponents/DialogPrompt/EditPrompt/FeedPrompt";
import DeleteFeedPrompt from "../Common/MUIComponents/DialogPrompt/EditProfile/DeletePrompt/DeleteFeed";
import type {
  IdentifierType,
  SubIdentifierType,
} from "../Common/MUIComponents/DialogPrompt/EditProfile/EditFormDynamic";
import { useRouter } from "next/router";
import type { PortFolioRoutes } from "../../redux/interfaces/frontend/user";
import {
  getUserAndImagePortfolio,
  getUserAndImageFeed,
  getUserAndImageFeed1,
  getUserServices,
  getUserProducts,
  getEventsUserData,
} from "../../redux/slices/profile";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { updateNotification } from "../../redux/slices/notifications";
import type {
  DeletePointer,
  DeletePointer1,
  DeleteRequest,
  DeleteProductPointer,
  DeleteServiceRequest,
  DeletePointerService,
} from "../../redux/interfaces/backend/apis/deleteInterfaces";
import type { EditDataForm } from "../../redux/interfaces/backend/apis/";

import Spinner from "../Common/Spinner/Spinner";
import { IServiceTypes } from "../../redux/interfaces/backend/apis/services";
import { DeleteUserEventRequestPayload } from "../../pages/api/v2/user-profile/events/delete-events-user";
import { ResponseParams } from "../../redux/interfaces/backend/apiHandlers";
import { IProductOpsDelete } from "../../pages/api/v2/user-profile/products/product-user-delete";

export async function getStaticProps() {
  return { props: { isDark: true } };
}
export default function Skeleton(): ReactElement {
  const router = useRouter();
  const merchantSlug = router.query.merchantSlug as string[];
  const pageRoute = merchantSlug?.[1] || "portfolio";
  const pageSection = merchantSlug?.[2] ?? "images";
  const [showDrawer, setShowDrawer] = React.useState(true);
  const [editPrompt, setEditPrompt] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const identifier = pageRoute as PortFolioRoutes;
  const [editPromptData, setEditPromptData] = React.useState<EditDataForm>(
    {} as EditDataForm
  );
  const dispatch = useAppDispatch();
  const { firebaseToken, uid, isLoggedIn, displayName } = useAppSelector(
    (state) => state.user
  );
  const [isAdd, setAdd] = React.useState<"add" | "edit">("add");
  const [identifierPopup, setIdentifierPopup] = React.useState(false);
  const [deletePortfolio, setDeletePortfolio] = React.useState(false);
  const [deleteFeed, setDeleteFeed] = React.useState(false);
  const [deleteData, setDeleteData] = React.useState<
    | DeletePointer
    | DeletePointer1
    | DeleteProductPointer
    | DeleteEventType
    | DeletePointerService
  >();
  const [deleteData1, setDeleteData1] = React.useState<
    | DeletePointer
    | DeletePointer1
    | DeleteProductPointer
    | DeleteEventType
    | DeletePointerService
  >();
  const [deleteProd, setDeleteProd] = React.useState(false);
  const [deleteEvent, setDeleteEvent] = React.useState(false);
  const [deleteService, setDeleteService] = React.useState(false);

  const openEditPrompt = () => {
    closeIdentifierPrompt();
    setEditPrompt(true);
    modifyDeletePrompt(false);
  };

  const closeEditPrompt = () => setEditPrompt(false);
  const modifyDeletePrompt = (value: boolean) => setDeletePortfolio(value);

  const openIdentifierPrompt = () => setIdentifierPopup(true);

  const closeIdentifierPrompt = () => setIdentifierPopup(false);

  const [hide, showHide] = useState("");

  useEffect(() => {
    showHide(router.query.merchantSlug[1]);
  });
  const triggerImagePortfolioUpdate = () => {
    if (isLoggedIn && pageRoute === "portfolio" && pageSection === "images")
      dispatch(
        getUserAndImagePortfolio({
          firebaseToken: firebaseToken,
          startPoint: 0,
          endPoint: 30,
        })
      );
    else if (isLoggedIn && pageRoute === "feed" && pageSection === "images")
      dispatch(
        getUserAndImageFeed({
          firebaseToken: firebaseToken,
          startPoint: 0,
          endPoint: 30,
        })
      );
    else if (isLoggedIn && pageRoute === "feed" && pageSection === "text")
      dispatch(
        getUserAndImageFeed1({
          firebaseToken: firebaseToken,
          startPoint: 0,
          endPoint: 30,
        })
      );
    else if (isLoggedIn && pageRoute === "events") {
      dispatch(
        getEventsUserData({
          firebaseToken,
          location: pageSection as IServiceTypes,
          startAt: 0,
          endAt: 5,
        })
      );
    } else if (isLoggedIn && pageRoute === "services") {
      dispatch(
        getUserServices({
          firebaseToken,
          serviceStatus: pageSection as IServiceTypes,
          isEvent: false,
          uid: uid,
          startWith: 0,
          endAt: 5,
        })
      );
    } else if (isLoggedIn && pageRoute === "products") {
      dispatch(
        getUserProducts({
          firebaseToken,
          uid,
          serviceStatus: pageSection as IServiceTypes,
          startWith: 0,
          endAt: 5,
        })
      );
    }
  };

  const errorLogger = (error: any) => {
    dispatch(
      updateNotification({
        status: "error",
        message: "Unexpected Server Error Occured!",
        title: "Server Error",
        show: true,
        timeout: 1500,
      })
    );
    console.log(error);
    setDeleting(false);
    setDeleteData(undefined);
    setDeletePortfolio(false);
    setDeleteFeed(false);
  };

  const handleDeletion = () => {
    setDeleting(true);
    modifyDeletePrompt(false);
    if (deleteProd) {
      if (deleteData) {
        const payload: IProductOpsDelete = {
          firebaseToken: firebaseToken,
          productLocation: (deleteData as DeleteProductPointer).productRef,
        };
        fetch("/api/v2/user-profile/products/product-user-delete", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }).then((res) =>
          res.json().then((data) => {
            if (data.error) {
              dispatch(
                updateNotification({
                  status: "error",
                  message: "Failed to Delete the Product. Kindly Retry",
                  title: "Error",
                  show: true,
                })
              );
            } else {
              dispatch(
                updateNotification({
                  status: "success",
                  message: "Successfully Removed Product from Portfolio",
                  title: "Deleted Product",
                  show: true,
                })
              );
              triggerImagePortfolioUpdate();
            }
            setDeleting(false);
            setDeleteData(undefined);
            setDeletePortfolio(false);
          })
        );
      }
      return;
    } else if (deleteData) {
      if (deleteData) {
        const payload: DeleteUserEventRequestPayload = {
          firebaseToken,
          location: deleteData,
        };

        fetch("/api/v2/user-profile/events/delete-events-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        })
          .then((data) =>
            data
              .json()
              .then((data: ResponseParams) => {
                if (data.error) {
                  dispatch(
                    updateNotification({
                      status: "error",
                      message:
                        "Failed to Delete the Event. Kindly Retry...............",
                      title: "Error",
                      show: true,
                    })
                  );
                  errorLogger(data);
                } else {
                  dispatch(
                    updateNotification({
                      status: "success",
                      message: "Successfully Removed Event from Portfolio",
                      title: "Deleted Event",
                      show: true,
                    })
                  );
                  setDeleting(false);
                  setDeleteData(undefined);
                  setDeletePortfolio(false);
                  triggerImagePortfolioUpdate();
                }
              })
              .catch((error) => errorLogger(error))
          )
          .catch((error) => errorLogger(error));
      }
      return;
    }

    // else if(deleteData1){
    if (deleteData1 !== undefined) {
      // debugger;
      const payload: DeleteUserEventRequestPayload = {
        firebaseToken,
        payload: deleteData1,
      };
      console.log(payload, "pppppp");
      fetch("/api/feed/delete-caption", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((data) =>
          data
            .json()
            .then((data: ResponseParams) => {
              if (data.error) {
                dispatch(
                  updateNotification({
                    status: "error",
                    message: "Failed to Delete the Event. Kindly Retry",
                    title: "Error",
                    show: true,
                  })
                );
                errorLogger(data);
              } else {
                dispatch(
                  updateNotification({
                    status: "success",
                    message: "Successfully Removed Event from Portfolio",
                    title: "Deleted Event",
                    show: true,
                  })
                );
                setDeleting(false);
                setDeleteData(undefined);
                setDeletePortfolio(false);
                triggerImagePortfolioUpdate();
                dispatch(
                  getUserAndImageFeed({
                    firebaseToken,
                  })
                );
              }
            })
            .catch((error) => errorLogger(error))
        )
        .catch((error) => errorLogger(error));
    }
    // return;
    // }

    if (deleteData !== undefined) {
      const backendPayload: DeleteRequest = {
        firebaseToken: firebaseToken,
        data: deleteData,
        deleteProd: deleteProd,
      };
      fetch("/api/user-profile/delete-merchants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(backendPayload),
      }).then((response) => {
        response.json().then((data) => {
          if (!data.error) {
            setDeleting(false);
            setDeleteData(undefined);
            setDeletePortfolio(false);
            dispatch(
              updateNotification({
                status: "success",
                message: "Portfolio deleted successfully",
                show: true,
                title: "Deleted",
              })
            );
            triggerImagePortfolioUpdate();
          } else {
            setDeleting(false);
            setDeleteData(undefined);
            setDeletePortfolio(false);
            dispatch(
              updateNotification({
                status: "error",
                message: "Deletion Failed due to unexpected error",
                show: true,
                title: "Deletion Failed",
              })
            );
          }
        });
      });
    }
  };
  const deleteDataSetup = (
    data: DeleteDataTypes,
    deleteProd?: boolean,
    deleteEvent?: boolean,
    deleteService?: boolean
  ) => {
    modifyDeletePrompt(true);
    setDeleteData(data);
    setDeleteProd(deleteProd ?? false);
    setDeleteEvent(deleteEvent ?? false);
    setDeleteService(deleteService ?? false);
  };
  const deleteDataSetup1 = (
    data: DeleteDataTypes,
    deleteProd?: boolean,
    deleteEvent?: boolean,
    deleteService?: boolean
  ) => {
    modifyDeletePrompt(true);
    setDeleteData1(data);
    setDeleteProd(deleteProd ?? false);
    setDeleteEvent(deleteEvent ?? false);
    setDeleteService(deleteService ?? false);
  };

  const openIdentifierPromptOpWise = (
    op: "add" | "edit",
    data: EditDataForm
  ) => {
    closeEditPrompt();
    modifyDeletePrompt(false);
    setAdd(op);
    setEditPromptData(data);
    openIdentifierPrompt();
    // if (op === 'edit' && pag) triggerImagePortfolioUpdate();
  };

  const updateEditPrompt = (value: boolean) => {
    setEditPrompt(value);
  };

  return (
    <div className={classes.DrawerLayout}>
      {showDrawer && (
        <div
          className={
            hide == "terms" ||
            hide == "subscription-module" ||
            hide == "merchant-nda"
              ? ""
              : classes.SideDrawer
          }
        >
          <SideBar openEditPrompt={updateEditPrompt} />
        </div>
      )}
      <div className={classes.Body}>
        {deleting ? (
          <Spinner />
        ) : (
          <Body
            handleOpen={openIdentifierPromptOpWise}
            deleteData={deleteDataSetup}
            deleteData1={deleteDataSetup1}
          />
        )}
      </div>
      <EditPrompt
        open={editPrompt}
        handleClose={closeEditPrompt}
        handleClickOpen={openEditPrompt}
        identifier={identifier}
      />
      <PortfolioPrompt
        open={identifierPopup}
        handleClose={closeIdentifierPrompt}
        handleClickOpen={openIdentifierPrompt}
        identifier={identifier as IdentifierType}
        subIdentifier={pageSection as SubIdentifierType}
        isAdd={isAdd}
        editPromptData={editPromptData}
        triggerChanges={triggerImagePortfolioUpdate}
        metadata={{ name: displayName, uid }}
      />
      <FeedPrompt
        open={identifierPopup}
        handleClose={closeIdentifierPrompt}
        handleClickOpen={openIdentifierPrompt}
        identifier={identifier as IdentifierType}
        subIdentifier={pageSection as SubIdentifierType}
        isAdd={isAdd}
        editPromptData={editPromptData}
        triggerChanges={triggerImagePortfolioUpdate}
        metadata={{ name: displayName, uid }}
      />

      <DeleteImagePrompt
        open={deletePortfolio}
        handlePopup={modifyDeletePrompt}
        executeDeletion={handleDeletion}
      />
      <DeleteFeedPrompt
        open={deleteFeed}
        handlePopup={modifyDeletePrompt}
        executeDeletion={handleDeletion}
      />
    </div>
  );
}
