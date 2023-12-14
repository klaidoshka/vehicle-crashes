import { ChangeEvent, useRef, useState } from 'react';

import Result, { resultOfError } from '../../../api/rest/Result';
import { CrashEndpoints } from '../../../constants/Endpoints';
import { backend } from '../../../services/BackendService';

const ExcelManager = () => {
    const fileInput = useRef<HTMLInputElement>(null);

    const [messages, setMessages] = useState<string[]>([]);
    const [isError, setError] = useState<boolean>(false);

    const handleDownload = async () => {
        await backend
            .get(CrashEndpoints.downloadTemplate, { responseType: "blob" })
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement("a");

                link.href = url;
                link.setAttribute("download", "crashes-upload-template.xlsx");

                document.body.appendChild(link);

                link.click();
            })
            .catch(() => {});
    };

    const handleImport = async (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) {
            return;
        }

        const file = event.target.files[0];
        const fileExtension = file.name.split(".").pop();

        if (!file || fileExtension !== "xlsx") {
            setError(true);
            setMessages(["Only .xlsx files are allowed"]);

            return;
        }

        const formData = new FormData();

        formData.append("file", file);

        await backend
            .post<Result<number>>(CrashEndpoints.import, formData, {
                headers: {
                    ...backend.defaults.headers.common,
                    "Content-Type": "multipart/form-data"
                }
            })
            .then((response) => {
                setMessages([`${response.data.value} row(s) imported successfully!`]);

                setError(false);
            })
            .catch((e) => {
                const result = resultOfError(e);

                if (result.message) {
                    setMessages([result.message]);
                } else {
                    setMessages([]);
                }

                setMessages((errors) => [...errors, ...result.messages!]);

                setError(true);
            });
    };

    return (
        <div className='d-flex flex-column container w-100 justify-content-center align-items-center'>
            <div className='d-flex container w-100 justify-content-center align-items-center'>
                <ul
                    className='list-group h-100 overflow-auto m-2'
                    style={{
                        maxHeight: "100px"
                    }}
                >
                    {messages.map((message, index) => (
                        <li
                            key={index}
                            className={`list-group-item list-group-item-${
                                isError ? "danger" : "success"
                            }`}
                        >
                            {message}
                        </li>
                    ))}
                </ul>
            </div>

            <div className='d-flex container w-100 justify-content-center align-items-center'>
                <button
                    className='btn btm-sm btn-outline-dark m-1'
                    type='button'
                    onClick={handleDownload}
                >
                    Excel Template
                </button>

                <input
                    accept='.xlsx'
                    type='file'
                    ref={fileInput}
                    onChange={handleImport}
                    style={{ display: "none" }}
                />

                <button
                    className='btn btm-sm btn-outline-dark m-1'
                    type='button'
                    onClick={() => fileInput.current?.click()}
                >
                    Import Data
                </button>
            </div>
        </div>
    );
};

export default ExcelManager;
