const hashId = () => {
    return Math.floor(((Date.now() + Math.random()) * 10)).toString(36).substr(2, 9);
}

export default hashId;