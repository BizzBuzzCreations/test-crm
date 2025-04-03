const formatDate = (dateString) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding leading zero if single digit
    const day = date.getDate().toString().padStart(2, '0'); // Adding leading zero if single digit

    const hours = date.getHours().toString().padStart(2, '0'); // Adding leading zero if single digit
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Adding leading zero if single digit
    const seconds = date.getSeconds().toString().padStart(2, '0'); // Adding leading zero if single digit

    // Format: YYYY-MM-DD HH:MM:SS
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export default formatDate;