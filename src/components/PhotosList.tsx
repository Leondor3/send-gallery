import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";
import { useEffect, useState } from "react";
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { button } from "../theme/ThemeContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";

interface RoomProps {
    id: string,
    name: string,
    type: string
    photo: string
}

export function PhotoList() {
    const [rooms, setRooms] = useState<RoomProps[]>([]);

    useEffect(() => {
        async function fetchRooms() {
            try {
                const roomCollectionRef = collection(firestore, "gallery");
                const roomQuerySnapshot = await getDocs(roomCollectionRef);

                const roomData = roomQuerySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setRooms(roomData);
            } catch (error) {
                console.error("Error fetching rooms: ", error);
            }
        }

        fetchRooms();
    }, []);

    const handleDeletePhoto = async (roomId: string) => {
        try {
            await deleteDoc(doc(firestore, "gallery", roomId));
            const updatedRooms = rooms.filter((room) => room.id !== roomId);
            setRooms(updatedRooms);
        } catch (error) {
            console.error("Error deleting photo: ", error);
        }
    };


    function handleNavigateBack() {
        navigate(-1)
    }

    const navigate = useNavigate()

    return (
        <section className="pt-24">
            <button onClick={handleNavigateBack} className="absolute top-4 left-4 flex items-center gap-2">
                <ArrowLeft /> Voltar
            </button>
            <div className="grid grid-cols-3 gap-4 relative z-10">
                {rooms.map((item) => {
                    return (
                        <div className='bg-[#0f0f0f] shadow-lg p-4 rounded-sm w-96 z-10 space-y-4'>
                            <div className='flex gap-4'>
                                <div className='flex items-center space-x-2 justify-between w-full'>
                                    <h1 className='text-gray-50 font-bold font-inter'>{item.name}</h1>
                                    <span className='bg-blue-600/40 p-2 rounded-md text-blue-400 text-sm'>{item.type}</span>
                                </div>
                            </div>
                            <div className='flex space-y-4 flex-col items-start'>
                                <div className='w-full h-72 relative overflow-hidden rounded-lg'>
                                    <img className='w-full rounded-lg h-auto object-cover absolute inset-0' src={item.photo} />
                                </div>
                                <hr className='border w-full border-zinc-800' />
                                <AlertDialog.Root>
                                    <AlertDialog.Trigger asChild>
                                        <button
                                            className="bg-red-600 py-4 rounded-md w-full"
                                        >
                                            Deletar
                                        </button>
                                    </AlertDialog.Trigger>
                                    <AlertDialog.Portal>
                                        <AlertDialog.Overlay className="bg-zinc-950/60 data-[state=open]:animate-overlayShow fixed inset-0 z-40 " />
                                        <AlertDialog.Content className="z-40 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-zinc-950 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                                            <AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                                                Tem certeza que quer deletar a foto?
                                            </AlertDialog.Title>
                                            <AlertDialog.Description className="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">
                                                This action cannot be undone. This will permanently delete your account and remove your
                                                data from our servers.
                                            </AlertDialog.Description>
                                            <div className="flex items-center justify-end gap-4">
                                                <AlertDialog.Cancel asChild>
                                                    <button className="text-mauve11 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                                                        Cancelar
                                                    </button>
                                                </AlertDialog.Cancel>
                                                <AlertDialog.Action asChild>
                                                    <button
                                                        onClick={() => handleDeletePhoto(item.id)}
                                                        className={button({ color: 'deleted', size: 'md' })}>
                                                        Sim, deletar foto
                                                    </button>
                                                </AlertDialog.Action>
                                            </div>
                                        </AlertDialog.Content>
                                    </AlertDialog.Portal>
                                </AlertDialog.Root>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>

    )
}