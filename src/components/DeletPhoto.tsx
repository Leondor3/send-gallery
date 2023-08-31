import { button } from "../theme/ThemeContext";

export function DeletePhotos() {
    return (
        <button className={button({ size: "lg", color: 'deleted', center: 'flex'})}>
            <span>Delete Photo</span>
        </button>
    )
}