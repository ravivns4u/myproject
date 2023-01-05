import { useRouter } from "next/router";
import React from "react";
import lazyFeedLoader from "./LazyFeedLoader";
import ImageComponent from "./Image";
import { INavHeaderProps } from "../Common/NavHead/NavHead";
import { DeleteDataTypes } from "../../Body";
import { EditDataForm } from "../../../../../redux/interfaces/backend/apis";
import { comparitors } from "../constants/comparitors";
import { IDataTableStatic } from "../Common/DataTable/DataTable";
import VideoComponent from "./Video";
import TextComponent from "./Text";
export async function getStaticProps() {
  return { props: { isDark: true } };
}


export interface IProps {
  navbarProps: INavHeaderProps;
  externalDataTable: IDataTableStatic;
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

export default function FeedComponent(props: IProps) {
  const router = useRouter();
  const { navbarProps, externalDataTable } = props;
  const pageSection = router.query.merchantSlug?.[2] ?? comparitors.IMAGES;

  let Component = <div>Unavailable Component</div>;

  switch (pageSection) {
    case comparitors.VIDEOS: {
      const Video = lazyFeedLoader.videos;
      Component = (
        <VideoComponent {...props} pageNumber={externalDataTable.pageNumber} />
      );
      break;
    }
    case comparitors.IMAGES: {
      Component = (
        <ImageComponent {...props} pageNumber={externalDataTable.pageNumber} />
      );
      break;
    }
    case comparitors.TEXT: {
      Component = (
        <TextComponent {...props} pageNumber={externalDataTable.pageNumber} />
      );
      break;
    }
    default: {
    }
  }
  return Component;
}
