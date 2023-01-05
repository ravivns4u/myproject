import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import Image from 'next/image';
import moment from 'moment';
import { useAppSelector } from '../../redux/app/hooks';

const EventListComponent = (props: any) => {
  const { events } = props;
  const router = useRouter();

  const {
    user: { user },
  } = useAppSelector((state) => state);

  return events !== undefined && events?.length > 0 ? (
    events.map((event: any, index: number) => (
      <Box
        key={index}
        sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        onClick={() => user?.ndaSigned && router.push(`/featured/events/${event?.fileName}`)}
      >
        <Box sx={{ mr: 1 }}>
          <Image src={event?.eventsUri[0]} width='100%' height='60' alt='' />
        </Box>
        <Box sx={{ mt: '-10px' }}>
          <Typography sx={{}} variant='subtitle2'>
            {event?.name}
          </Typography>
          <Box>
            <Typography variant={'body2'} sx={{fontSize:12}}>{new Date(event?.startDate).toDateString()}</Typography>
            <Typography variant={'body2'} sx={{fontSize:12}}>
              {moment.unix(event?.startTimeStamp).format('hh:mm A')} -{' '}
              {moment.unix(event?.endTimeStamp).format('hh:mm A')}
            </Typography>
          </Box>
        </Box>
      </Box>
    ))
  ) : (
    <Box sx={{ mb: '20px', textAlign: 'center' }}>No Events Found</Box>
  );
};

export default EventListComponent;
