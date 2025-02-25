export function getPlaceholderImage(imageUrl) {
    const placeholderImageUrl = "/full-logo.svg";
    return imageUrl ? imageUrl : placeholderImageUrl;
}