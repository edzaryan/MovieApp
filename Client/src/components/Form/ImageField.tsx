import React, { ChangeEvent, useState } from "react";
import { useFormikContext } from "formik";

interface imageFieldProps {
    displayName: string;
    field: string;
    imageURL?: string;
}

const ImageField: React.FC<imageFieldProps> = ({ displayName, field, imageURL = "" }) => {
    const [imageBase64, setImageBase64] = useState("");
    const [currentImageURL, setCurrentImageURL] = useState(imageURL);
    const {values} = useFormikContext<any>();

    const handleOnChange = (eventsArgs: ChangeEvent<HTMLInputElement>) => {
        if (eventsArgs.currentTarget.files) {
            const file = eventsArgs.currentTarget.files[0];
            if (file) {
                toBase64(file)
                    .then((base64Representation: string) => setImageBase64(base64Representation))
                    .catch(error => console.log(error));

                values[field] = file;
                setCurrentImageURL("");
            } else {
                setImageBase64("");
            }
        }
    };

    const toBase64 = (file: File) => {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        })
    };

    return (
        <div className="grid gap-2">
            <label htmlFor={field}>{displayName}</label>
            <div>
                <input type="file" id={field} accept=".jpg,.jpeg,.png" onChange={handleOnChange} />
            </div>
            <div>
                {imageBase64 &&
                    <div>
                        <div className="mt-1 w-[450px]">
                            <img src={imageBase64} alt="selected image" />
                        </div>
                    </div>
                }
                {currentImageURL &&
                    <div>
                        <div className="mt-1 w-[450px]">
                            <img src={currentImageURL} alt="selected image" />
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default ImageField;