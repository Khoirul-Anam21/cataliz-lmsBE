export const getCloudinaryPublicId = (url: string) => {
    const splitStr = url.split('/');
    const lastElement = splitStr[splitStr.length - 1];
    const splitLastElement = lastElement.split(".");
    return splitLastElement[0];
}