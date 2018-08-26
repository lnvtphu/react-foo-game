const emailFormat = (data, schema) => {
    const regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (regex.test(data)) {
        return null;
    }
    return 'Invalid foo'
    // return regex.test(data) ? null : 'Invalid email foo';
}
const passwordFormat = (data, schema) => {
    const regex = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
}

export { emailFormat };