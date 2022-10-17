export function formatDate(date: string) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour12: false,
    }).format(new Date(date))
}
