import { useState } from "react"
import { TextInput } from "react95"
import styled from "styled-components"

import { useSystemContext } from "@/contexts/system"
import DialogWindow from "@/components/system/Dialog/DialogWindow"
import { DisabledText, Paragraph } from "../../Window/CommonStyle"

const UploadImage = () => {
  const [fileMaxSizeError, setFileMaxSizeError] = useState(false)

  const { updateSystemValue } = useSystemContext()

  const uploadBackgroundImage = (imgStr: string) => {
    updateSystemValue("backgroundImage", imgStr)
  }

  const onChangeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 2 * 1024 * 1024) {
      setFileMaxSizeError(true)
      e.target.value = ""
      return
    }
    // file is base64 encoded and formated start with "url()"
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      if (typeof reader.result === "string") {
        uploadBackgroundImage(`url(${reader.result})`)
      }
    }
  }

  return (
    <>
      <Paragraph>
        <label htmlFor="image_upload">Uploaded image:</label>
      </Paragraph>
      <DisabledText>
        uploaded image is stored locally on your device.
      </DisabledText>

      <FileInputStyled
        id="image_upload"
        alt="image upload"
        onChange={onChangeUpload}
      />
      {fileMaxSizeError && (
        <DialogWindow
          type="error"
          size="small"
          onClose={() => {
            setFileMaxSizeError(false)
          }}
        >
          File size must be less than 2MB{" "}
        </DialogWindow>
      )}
    </>
  )
}

const FileInputStyled = styled(TextInput).attrs({
  type: "file",
  accept: "image/*",
  placeholder: "Choose a file...",
  fullWidth: true,
})`
  margin-top: 1rem;
  & > input[type="file"] {
    padding: 0.2rem;
  }

  & > input[type="file"]::-webkit-file-upload-button {
    background: ${({ theme }) => theme.material};
    color: ${({ theme }) => theme.canvasText};
    border: 1px solid ${({ theme }) => theme.canvasText};
    padding: 0.2rem;
    cursor: pointer;
    &:hover {
      box-shadow: 1px 1px ${({ theme }) => theme.canvasText};
      text-shadow: 1px 1px ${({ theme }) => theme.canvasText};
      outline: none;
    }
  }
`

export default UploadImage
