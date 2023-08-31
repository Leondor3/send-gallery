import { AddPhotos } from "../components/AddPhoto";
import { ListPhotos } from "../components/ListPhoto";

export function Home() {
    return (
        <div className="flex gap-4 items-center">
            <AddPhotos />
            <ListPhotos />
        </div>
    )
}