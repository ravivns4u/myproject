import classes from './Notification.module.scss';
import { useAppDispatch, useAppSelector } from '../../../redux/app/hooks';
import { hideNotification } from '../../../redux/slices/notifications';

function Notification() {
  const { title, message, status, show, timeout } = useAppSelector(
    (state) => state.notification
  );
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(hideNotification());
  };

  if (!show) return null;

  let statusClasses = '';

  if (status === 'success') {
    statusClasses = classes.success;
    if (timeout !== undefined && timeout !== false) {
      setTimeout(() => {
        handleClose();
      }, timeout as number);
    }
  }

  if (status === 'error') {
    statusClasses = classes.error;
    if (timeout !== undefined && timeout !== false) {
      setTimeout(() => {
        handleClose();
      }, timeout as number);
    }
  }

  if (status === 'pending') {
    statusClasses = classes.pending;
  }

  const activeClasses = `${classes.notification} ${statusClasses}`;

  return (
    <div className={activeClasses} onClick={handleClose}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
