import { RequestStatus } from '../types';

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatUserName = (user: { firstName: string; middleName: string | null; lastName: string | null }): string => {
  const parts = [user.firstName];
  if (user.middleName) parts.push(user.middleName);
  if (user.lastName) parts.push(user.lastName);
  return parts.join(' ');
};

export const getStatusColor = (status: RequestStatus): "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" => {
  switch (status) {
    case 'PendingApproval':
      return 'warning';
    case 'Approved':
      return 'success';
    case 'Rejected':
      return 'error';
    case 'Closed':
      return 'default';
    default:
      return 'default';
  }
};

