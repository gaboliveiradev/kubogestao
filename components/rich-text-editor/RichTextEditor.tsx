'use client'

import { useEffect, type ReactNode } from 'react'
import { useEditor, EditorContent, type Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Button } from '@/components/ui/button'

type RichTextEditorProps = {
    value?: string
    onChange: (html: string) => void
    /** Conteúdo extra na toolbar (ex.: botões de inserção de chaves) */
    renderToolbarExtra?: (editor: Editor) => ReactNode
    heightClassName?: string
}

export function RichTextEditor({ value, onChange, renderToolbarExtra, heightClassName = 'h-60' }: RichTextEditorProps) {
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

    // Sincroniza alterações externas (ex.: observação padrão aplicada depois da montagem)
    useEffect(() => {
        if (!editor) return
        const next = value ?? ''
        if (next !== editor.getHTML() && !(next === '' && editor.isEmpty)) {
            editor.commands.setContent(next, { emitUpdate: false })
        }
    }, [value, editor])

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

                {renderToolbarExtra?.(editor)}
            </div>

            {/* Editor */}
            <div className={`p-2 ${heightClassName} overflow-y-auto`}>
                <EditorContent
                    editor={editor}
                    className="h-full [&_.ProseMirror]:h-full [&_.ProseMirror]:outline-none"
                />
            </div>
        </div>
    )
}
