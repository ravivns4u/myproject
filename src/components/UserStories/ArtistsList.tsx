import { Avatar, Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useAppSelector } from '../../redux/app/hooks';

const ArtistListComponent = (props: any) => {
  console.log("props", props)
  const { artists } = props;
  const router = useRouter();
    
  const {
    user: { user },
  } = useAppSelector((state) => state);

  return artists !== undefined && artists.length > 0 ? (
    artists.map((artist: any, index: any) => (
      <Box className='artistInfo' key={index}>
        <Avatar
          sx={{ width: 56, height: 56 }}
          src={artist?.publicUri ? artist.publicUri : '/portfolio/person.png'}
          alt=''
        />
        <Typography variant='subtitle1' sx={{ fontWeight: 'medium', textTransform: 'capitalize', ml: 1 }}>
          {artist?.displayName}
        </Typography>
        <div
          className='artistNext'
          onClick={() => user?.ndaSigned && router.push(`/featured/artists/${artist?.uid}`)}
        >
          <svg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <circle cx='20' cy='20' r='20' fill='#FFFF00' />
            <path
              d='M30.7299 20.9571C31.1204 20.5666 31.1204 19.9334 30.7299 19.5429L24.3659 13.1789C23.9754 12.7884 23.3423 12.7884 22.9517 13.1789C22.5612 13.5695 22.5612 14.2026 22.9517 14.5931L28.6086 20.25L22.9517 25.9069C22.5612 26.2974 22.5612 26.9305 22.9517 27.3211C23.3423 27.7116 23.9754 27.7116 24.3659 27.3211L30.7299 20.9571ZM12.9961 21.25H30.0228V19.25H12.9961V21.25Z'
              fill='#35352F'
            />
          </svg>
        </div>
      </Box>
    ))
  ) : (
    <Box sx={{ textAlign: 'center' }}>No Artists Found</Box>
  );
};

export default ArtistListComponent;
