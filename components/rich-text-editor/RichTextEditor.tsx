/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Button } from '@/components/ui/button'

export function RichTextEditor({ value, onChange }: any) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: false,
                bulletList: false,
                orderedList: false,
                listItem: false,
                blockquote: false,
                code: false,
                codeBlock: false,
                horizontalRule: false,
                hardBreak: false,
            }),
        ],
        content: value,
        immediatelyRender: false,
        onUpdate({ editor }) {
            onChange(editor.getHTML())
        },
    })

    if (!editor) return null

    return (
        <div className="border rounded-md overflow-hidden">

            {/* Toolbar */}
            <div className="flex flex-wrap gap-1 border-b p-1 bg-muted">
                <Button
                    size="sm"
                    type='button'
                    variant={editor.isActive('bold') ? 'default' : 'outline'}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                >
                    <b>B</b>
                </Button>

                <Button
                    size="sm"
                    type='button'
                    variant={editor.isActive('italic') ? 'default' : 'outline'}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                    <i>I</i>
                </Button>

                <Button
                    size="sm"
                    type='button'
                    variant={editor.isActive('strike') ? 'default' : 'outline'}
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                >
                    <s>S</s>
                </Button>
            </div>

            {/* Editor */}
            <div className="p-2 h-60 overflow-y-auto">
                <EditorContent
                    editor={editor}
                    className="h-full [&_.ProseMirror]:h-full [&_.ProseMirror]:outline-none"
                />
            </div>
        </div>
    )
}
