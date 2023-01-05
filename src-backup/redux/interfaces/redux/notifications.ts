export interface NotificationProps {
  title: string;
  message: string;
  status: 'success' | 'error' | 'pending';
  show?: boolean;
  timeout?: number | false; //seconds
}
