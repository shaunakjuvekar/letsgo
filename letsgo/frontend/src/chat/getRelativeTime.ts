export default function getRelativeTime(timestamp: string): string {
  const now = new Date();
  const then = new Date(timestamp);
  const secondsPast = (now.getTime() - then.getTime()) / 1000;

  if (secondsPast < 60) {
    // Less than a minute
    return `${Math.round(secondsPast)} seconds ago`;
  } else if (secondsPast < 3600) {
    // Less than an hour
    const minutes = Math.round(secondsPast / 60);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (secondsPast <= 86400) {
    // Less than a day
    const hours = Math.round(secondsPast / 3600);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else {
    // More than a day
    const days = Math.round(secondsPast / 86400);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }
}
