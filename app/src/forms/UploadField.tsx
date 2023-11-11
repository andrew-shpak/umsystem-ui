import {Dispatch, DragEvent, ReactNode, SetStateAction, useRef, useState,} from 'react'

interface UploadFieldProps {
    name: NonNullable<string>
    multiple?: boolean
    placeholder?: string
    setFiles: Dispatch<SetStateAction<File[]>>
    files: File[]
    helperText?: ReactNode
    accept?: string
}

export default function UploadField(props: UploadFieldProps) {
    const {
        name,
        multiple = true,
        placeholder = 'Виберіть файл',
        files,
        setFiles,
        helperText,
        accept = 'image/*',
    } = props
    const [isHover, setIsHover] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const onClick = () => {
        if (inputRef.current) {
            inputRef.current.click()
        }
    }
    const isImage = files.some(file => file.type.startsWith('image'))
    return (
        <>
            <div
                onPaste={event => {
                    const clipboardData = event.clipboardData.files
                    if (clipboardData.length > 0) {
                        event.preventDefault()
                        const items = multiple
                            ? Array.from(clipboardData)
                            : [clipboardData[0]]
                        setFiles(items)
                    }
                }}
                onClick={onClick}
                onDrop={event => {
                    event.preventDefault()
                    event.stopPropagation()
                    if (event.dataTransfer.files.length === 0) return
                    const items = multiple
                        ? Array.from(event.dataTransfer.files)
                        : [event.dataTransfer.files[0]]
                    setFiles(items)
                }}
                onDragOver={(event: DragEvent<HTMLDivElement>) => {
                    event.preventDefault()
                    event.stopPropagation()
                    setIsHover(true)
                }}
                onDragLeave={event => {
                    event.preventDefault()
                    event.stopPropagation()
                    setIsHover(false)
                }}
                className={`h-32 rounded border-2 p-2 cursor-pointer ${
                    isHover ? 'border-dashed' : 'border-solid'
                } border-blue-300`}
            >
                <input
                    ref={inputRef}
                    onChange={event => {
                        if (!event.target.files) return
                        const items = Array.from(event.target.files)
                        setFiles(items)
                    }}
                    type="file"
                    className="hidden"
                    multiple={multiple}
                    id={name}
                    name={name}
                    accept={accept}
                />
                <label htmlFor={name}>{placeholder}</label>
                {helperText ? <div className="pl-2">{helperText}</div> : null}
            </div>
            {isImage ? (
                <div className="mt-4">
                    {files.map(file => (
                        <img
                            key={file.name}
                            height="50%"
                            className="mb-4"
                            width="100%"
                            src={URL.createObjectURL(file)}
                        />
                    ))}
                </div>
            ) : (
                <ul className="mt-4 list-inside list-disc">
                    {files.map(file => (
                        <li key={file.name} className="mb-4">
                            <span>{file.name}</span>
                        </li>
                    ))}
                </ul>
            )}
        </>
    )
}
