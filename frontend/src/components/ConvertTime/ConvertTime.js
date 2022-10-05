function ConvertTime(time) {
    return new Date(time).toLocaleDateString('en-us', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    })
}

export default ConvertTime;
