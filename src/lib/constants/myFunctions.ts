

export function getRelativeTime(dateString: string): string {
    const currentDate = new Date();
    const date = new Date(dateString);
    const timeDifference = currentDate.getTime() - date.getTime();

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) {
        return years === 1 ? "1y" : `${years}y`;
    } else if (months > 0) {
        return months === 1 ? "1m" : `${months}m`;
    } else if (days > 0) {
        return days === 1 ? "1d" : `${days}d`;
    } else if (hours > 0) {
        return hours === 1 ? "1h" : `${hours}h`;
    } else if (minutes > 0) {
        return minutes === 1 ? "1min" : `${minutes}min`;
    } else {
        return seconds === 1 ? "1s" : `${seconds}s`;
    }
}

