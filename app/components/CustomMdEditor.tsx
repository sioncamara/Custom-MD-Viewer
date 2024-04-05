"use client"
import React, { useContext, useEffect, useState } from "react"
import MDEditor, {
  commands,
  ICommand,
  getCommands,
  EditorContext,
} from "@uiw/react-md-editor"
import rehypeSanitize from "rehype-sanitize"
import { cleanClipboardText } from "../utils/stringUtils"

const ToggleViewMode = () => {
  const { preview, dispatch } = useContext(EditorContext)
  const click = () => {
    dispatch!({
      preview: preview === "preview" ? "edit" : "preview",
    })
  }
  if (preview === "edit") {
    return (
      <svg
        width="12"
        height="12"
        viewBox="0 0 520 520"
        className="cursor-pointer"
        onClick={click}
      >
        <polygon
          fill="currentColor"
          points="0 71.293 0 122 319 122 319 397 0 397 0 449.707 372 449.413 372 71.293"
        />
        <polygon
          fill="currentColor"
          points="429 71.293 520 71.293 520 122 481 123 481 396 520 396 520 449.707 429 449.413"
        />
      </svg>
    )
  }
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 520 520"
      className="cursor-pointer"
      onClick={click}
    >
      <polygon
        fill="currentColor"
        points="0 71.293 0 122 38.023 123 38.023 398 0 397 0 449.707 91.023 450.413 91.023 72.293"
      />
      <polygon
        fill="currentColor"
        points="148.023 72.293 520 71.293 520 122 200.023 124 200.023 397 520 396 520 449.707 148.023 450.413"
      />
    </svg>
  )
}

const toggleView: ICommand = {
  name: "preview",
  keyCommand: "preview",
  value: "preview",
  icon: <ToggleViewMode />,
}

const isMobileDevice = () => {
  if (typeof window !== "undefined") {
    return (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      ) || window.innerWidth <= 768
    )
  }
  return false
}

export default function CustomMdEditor() {
  const isMobile = isMobileDevice()
  const [value, setValue] = useState<string>("**Loading...**")
  const [editorCommands, setEditorCommands] = useState<ICommand[]>([])

  const setClipboardText = async () => {
    try {
      const clipboardText = await navigator.clipboard?.readText()
      const cleanedText = clipboardText
        ? cleanClipboardText(clipboardText)
        : "**Hello world!!!**"
      setValue(cleanedText)
    } catch (error) {
      setValue("**Hello world!!!**")
    }
  }

  useEffect(() => {
    if (isMobile) {
      setValue("**Hello world!!!**")
    } else {
      setEditorCommands(getCommands())
      setClipboardText()
    }
  }, [isMobile])

  const ReplaceWithClipboard = () => {
    return (
      <button onClick={setClipboardText} className="!mx-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          fill="currentColor"
          viewBox="0 0 256 256"
        >
          <path d="M200,32H163.74a47.92,47.92,0,0,0-71.48,0H56A16,16,0,0,0,40,48V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm-72,0a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm72,184H56V48H82.75A47.93,47.93,0,0,0,80,64v8a8,8,0,0,0,8,8h80a8,8,0,0,0,8-8V64a47.93,47.93,0,0,0-2.75-16H200Z"></path>
        </svg>
      </button>
    )
  }

  const clipboardButton = {
    name: "toggleView",
    keyCommand: "toggleView",
    value: "toggleView",
    icon: <ReplaceWithClipboard />,
  }
  return (
    <div className="container">
      <MDEditor
        value={value}
        onChange={(val) => {
          setValue(val!)
        }}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
        preview={"preview"}
        fullscreen
        extraCommands={[
          commands.codeLive,
          toggleView,
          clipboardButton,
          commands.fullscreen,
        ]}
        commands={editorCommands}
      />
    </div>
  )
}
