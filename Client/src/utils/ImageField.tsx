import React, {ChangeEvent, useState} from "react";
import {useFormikContext} from "formik";

interface imageFieldProps {
    displayName: string;
    field: string;
    imageURL?: string;
}

const ImageField: React.FC<imageFieldProps> = ({ displayName, imageURL="", field }) => {

    const [imageBase64, setImageBase64] = useState<string>("");
    const [currentImageURL, setCurrentImageURL] = useState<string>(imageURL);
    const {values} = useFormikContext<any>();

    const divStyle = { marginTop: '10px' };
    const imgStyle = { width: '450px' };

    const handleOnChange = (eventsArgs: ChangeEvent<HTMLInputElement>) => {
        if (eventsArgs.currentTarget.files) {
            const file = eventsArgs.currentTarget.files[0];

            if (file) {
                toBase64(file)
                    .then((base64Representation : string) => setImageBase64(base64Representation))
                    .catch(error => console.log(error));

                values[field] = file;
                setCurrentImageURL("");
            } else {
                setImageBase64('');
            }
        }
    }

    const toBase64 = (file: File) => {
        return new Promise<string>((resolve, reject) => {
           const reader = new FileReader();
           reader.readAsDataURL(file);
           reader.onload = () => resolve(reader.result as string);
           reader.onerror = (error) => reject(error);
        });
    }

    return (
        <div className="mb-3">
            <label className="mb-1">{displayName}</label>
            <div>
                <input type="file" accept=".jpg,.jpeg,.png" onChange={handleOnChange} />
            </div>
            {
                imageBase64 ?
                    <div>
                        <div style={divStyle}>
                            <img style={imgStyle} src={imageBase64} alt="Uploaded preview" />
                        </div>
                    </div> :
                    null
            }
            {
                currentImageURL ?
                    <div>
                        <div style={divStyle}>
                            <img style={imgStyle} src={currentImageURL} alt="Current preview" />
                        </div>
                    </div> :
                    null
            }
        </div>
    )
}

export default ImageField;