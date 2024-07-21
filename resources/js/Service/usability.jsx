export const randomString = (length = 8) => {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var string_length = length;
    var randomstring = '';
    for (var i = 0; i < string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
    }
    return randomstring;
}

export const formatDate = (dateString, formatDate = true) => {
    const date = new Date(dateString);

    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // getUTCMonth() returns month from 0-11
    const year = date.getUTCFullYear();
    if (formatDate) {
        const formattedDate = `${day}-${month}-${year}`;
        return formattedDate;
    } else {
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    }
}

export const cutString = (text, maxWords = 5, addDots = true) => {
    const words = text.split(' ');
  const shortenedText = words.length > maxWords ? words.slice(0, maxWords).join(' ') + (addDots ? ' ...' : '') : text;
  return <span>{shortenedText}</span>;
}