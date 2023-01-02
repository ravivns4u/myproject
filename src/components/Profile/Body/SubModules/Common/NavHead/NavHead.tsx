import { useRouter } from 'next/router';
import React from 'react';
import { EditDataForm } from '../../../../../../redux/interfaces/backend/apis';
import { ImagePortfolioData } from '../../../../../../redux/interfaces/backend/apis/ImagePortfolio';
import { ImageFeedData } from '../../../../../../redux/interfaces/backend/apis/ImageFeed';
import classes from './NavHead.module.scss';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
export async function getStaticProps() {
  return { props: { isDark: true } };
}

interface INavHeadOptions {
  comparitor: string;
  href: (userId: string) => string;
  buttonTitle: string;
  showAddNew?: boolean;
}
interface INavHeadOption {
  comparitor: string;
  buttonText?: string;
  showAddNew?: boolean;
}

export interface INavHeaderProps {
  availableOptions: INavHeadOptions[];
  merchantSlug: string[];
  activeComponent: INavHeadOption;
  handleOpen: (editString: 'edit' | 'add', data: EditDataForm) => void;
}

export default function NavHead(props: INavHeaderProps) {

  const { availableOptions, merchantSlug, activeComponent, handleOpen } = props;
  const router = useRouter();
  return (
    <div className={classes.TopNavigationBar}>
      <div className={classes.RowNavigationButtons}>
        {availableOptions.map((option, index) => {
          const { comparitor } = option;
          let comparitorString = '/';
          if (merchantSlug && merchantSlug.length > 2) {
            comparitorString = merchantSlug[2];
          }
          return (
            <div
              className={
                comparitorString === comparitor
                  ? classes.RowActive
                  : classes.RowElementInactive
              }
              onClick={() => router.push(option.href(merchantSlug[0]))}
              key={index}>
              {option.buttonTitle}
            </div>
          );
        })}
      </div>
      {/* {router.asPath.includes("/feed/text") ? (
        <>
          <Button
            className={["ThemeButtonYellow", classes.CTAButton].join(" ")}
            onClick={() => handleOpen("add", {} as ImagePortfolioData)}
            startIcon={<AddIcon />}
          >
            Add New{" " + activeComponent.buttonText + " " + availableOptions[2].buttonTitle}
          </Button>
        </>
      ) 
      : activeComponent.showAddNew &&
      (
        <>
          <Button
            className={["ThemeButtonYellow", classes.CTAButton].join(" ")}
            onClick={() => handleOpen("add", {} as ImagePortfolioData)}
            startIcon={<AddIcon />}
          >
            Add New{" " + activeComponent.buttonText}
          </Button>
        </>
      )
    } */}
      {activeComponent.showAddNew && (
        <Button
          className={['ThemeButtonYellow', classes.CTAButton].join(' ')}
          onClick={() => handleOpen('add', {} as ImagePortfolioData)}
          startIcon={<AddIcon />}>
          Add New {' ' + activeComponent.buttonText}
        </Button>
      )}
    </div>
  );
}