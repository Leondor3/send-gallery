import { button, input } from "../theme/ThemeContext";
import * as Dialog from '@radix-ui/react-dialog';
import { firestore, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { CircleNotch, X } from "@phosphor-icons/react";
import { useState } from "react";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod';
import { Plus } from '@phosphor-icons/react'
import { addDoc, collection } from "firebase/firestore";

const createGallerySchema = z.object({
    name: z.string()
        .nonempty()
        .transform((name) => {
            return name
                .trim()
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
        }),
    photo: z.instanceof(FileList)
        .transform((list) => list.item(0)),
    type: z.string()
        .nonempty()
        .transform((type) => {
            return type
                .trim()
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
        }),
});

type CreateGalleryData = z.infer<typeof createGallerySchema>;

export function AddPhotos() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateGalleryData>({
        resolver: zodResolver(createGallerySchema),
    });

    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
    const [loading, setLoading] = useState(false);

    const handleUpload = async (data: CreateGalleryData) => {
        setLoading(true);
        const storageRef = ref(storage, `gallery/${data.name}`);
        const uploadTask = uploadBytesResumable(storageRef, data?.photo);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
            },
            (error) => {
                alert(error);
                setMessage({ text: "Ocorreu um erro ao fazer upload da imagem.", type: "error" });
            },
            async () => {
                try {
                    const url = await getDownloadURL(uploadTask.snapshot.ref);
                    const combinedData = { ...data, photo: url };
                    const docRef = await addDoc(collection(firestore, "gallery"), combinedData);
                    setMessage({ text: "A imagem foi enviada com sucesso!", type: "success" });
                } catch (error) {
                    console.error("Error adding document: ", error);
                    setMessage({ text: "Ocorreu um erro ao adicionar o documento.", type: "error" });
                } finally {
                    setLoading(false);
                }
            }
        );
    };

    const selectOptions = [
        { value: 'pessoal', label: 'Pessoal' },
        { value: 'artistas', label: 'Artistas' }
    ];

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <button className={button({ size: "lg", color: 'primary', center: 'flex' })}>
                    <Plus /> Adicionar Foto
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-zinc-900/80 fixed inset-0" />
                <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-zinc-950 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <Dialog.Title className="font-bold text-2xl">
                        Adicionar uma nova arte
                    </Dialog.Title>
                    <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
                        Make changes to your profile here. Click save when you're done.
                    </Dialog.Description>
                    <form onSubmit={handleSubmit(handleUpload)}>
                        <div className="flex flex-col gap-6 w-full pb-6">
                            <div className="flex flex-col gap-2">
                                <label className="font-semibold ">
                                    Nome
                                </label>
                                <input
                                    className={input()}
                                    type="text"
                                    placeholder="Digite o nome pra foto"
                                    {...register("name")}
                                />
                                <label className="font-semibold">
                                    Selecione a Imagem
                                </label>
                                <input
                                    accept="image/*"
                                    className={input()}
                                    type="file"
                                    placeholder="Selecionar Imagem"
                                    {...register("photo")}
                                />
                            </div>
                            <select
                                {...register("type")}
                                className={input()}
                                defaultValue=""
                            >
                                <option disabled value="" className="text-gray-600">
                                    Selecione o tipo da imagem
                                </option>
                                {selectOptions?.map((num, index) => {
                                    return (
                                        <option key={index} value={num.value} className="text-gray-50">
                                            {num.label}
                                        </option>
                                    );
                                })}
                            </select>
                            <div className="flex justify-end">
                                <button type="submit" className={button({ color: 'secondary', size: 'lg', center: 'flex' })} disabled={loading}>
                                    {loading ? <CircleNotch className="animate-spin" /> : 'Enviar Foto'}
                                </button>
                            </div>
                        </div>
                    </form>
                    <Dialog.Close asChild>
                        <button
                            className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                            aria-label="Close"
                        >
                            <X />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
            {message && (
                <div className={`absolute top-0 w-full py-4 text-center ${message.type === "success" ? "bg-green-400" : "bg-red-400"} left-0 z-50`}>
                    <span>{message.text}</span>
                </div>
            )}
        </Dialog.Root>
    )
}