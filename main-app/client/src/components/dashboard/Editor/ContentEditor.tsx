import { MinimalTiptapEditor } from "@/components/ui/minimal-tiptap"
import { type Content } from "@tiptap/react"
import { useState } from "react"

export default function ContentEditor() {
  const [value, setValue] = useState<Content>("")

  return (
    <MinimalTiptapEditor
      value={value}
      onChange={setValue}
      className="w-full h-full bg-zinc-900/50 border border-zinc-700 rounded-md text-zinc-100 focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500 transition-colors duration-200"
      editorContentClassName="p-4 leading-relaxed"
      output="html"
      placeholder="Start writing your post..."
      editable
    />
  )
}
