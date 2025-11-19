// src/Tiptap.tsx
import { useEditor, EditorContent, EditorContext } from '@tiptap/react'
import { FloatingMenu, BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import { useMemo } from 'react'

export default function Tiptap() {
    const editor = useEditor({
        extensions: [StarterKit], // define your extension array
        content: '<p>Hello World!</p>', // initial content
    })

    // Memoize the provider value to avoid unnecessary re-renders
    const providerValue = useMemo(() => ({ editor }), [editor])

    return (
        <EditorContext.Provider value={providerValue}>
            <EditorContent editor={editor} className='bg-red-500 h-full' />
            <FloatingMenu editor={editor} className='bg-green-500 h-full'>This is the floating menu</FloatingMenu>
            <BubbleMenu editor={editor} className='bg-blue-600'>This is the bubble menu</BubbleMenu>
        </EditorContext.Provider>
    )
}