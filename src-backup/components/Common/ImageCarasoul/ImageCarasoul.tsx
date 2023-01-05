import React, { ReactElement } from 'react';
import classes from './ImageCarasoul.module.scss';
import Image from 'next/image';
export default function ImageCarasoul(props: {
  imagePaths: string[];
  respondtoLogin: boolean;
}): ReactElement {
  const [unmounted, setUnmounted] = React.useState(false);
  const [index, setIndex] = React.useState<number>(0);

  const { imagePaths, respondtoLogin } = props;
  React.useEffect(() => {
    setTimeout(() => {
      if (!unmounted) setIndex((index + 1) % imagePaths.length);
    }, 3000);
  }, [index, imagePaths.length, unmounted]);

  React.useEffect(() => {
    return () => {
      setUnmounted(true);
    };
  }, []);

  return (
    <div
      className={
        respondtoLogin ? classes.ContainerWithLogin : classes.Container
      }>
      <div className={classes.ImageContainer}>
        <Image
          src={imagePaths[index]}
          height={600}
          width={600}
          layout='responsive'
          alt={'Sign up User'}
        />
      </div>
      <div className={classes.Switcher}>
        {imagePaths.map((_, ii) =>
          ii === index ? (
            <div
              key={ii}
              className={[classes.Circle, classes.Circle_active].join(
                ' '
              )}></div>
          ) : (
            <div key={ii} className={[classes.Circle].join(' ')}></div>
          )
        )}
      </div>
    </div>
  );
}
