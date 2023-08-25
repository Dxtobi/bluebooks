<script>
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';

	/**
	 * @type {HTMLDivElement}
	 */
	let element;
	/**
	 * @type {Editor}
	 */
	let editor;

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [StarterKit],
			content: '<h1>Chapter 1 </h1>',
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

{#if editor}
	<div class="flex justify-between mb-5 bg-slate-200 p-2 rounded-lg">
		<button
			class="formarters"
			on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
			class:active={editor.isActive('heading', { level: 1 })}
		>
			H1
		</button>
		<button
			class="formarters"
			on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
			class:active={editor.isActive('heading', { level: 2 })}
		>
			H2
		</button>
		<button
			class="formarters"
			on:click={() => editor.chain().focus().setParagraph().run()}
			class:active={editor.isActive('paragraph')}
		>
			P
		</button>
		<button
			class="formarters italic"
			on:click={() => editor.chain().focus().toggleItalic().run()}
			class:active={editor.isActive('italic')}
		>
			I
		</button>
		<button
			class="formarters bg-gray-300 p-2"
			on:click={() => editor.chain().focus().toggleBlockquote().run()}
			class:active={editor.isActive('blockquote')}
		>
			Q
		</button>
		<button
			class="formarters font-bold"
			on:click={() => editor.chain().focus().toggleBold().run()}
			class:active={editor.isActive('bold')}
		>
			B
		</button>
	</div>

	<!-- do and undo -->

	<div class="flex gap-5 mb-5 bg-slate-200 p-2 rounded-lg w-fit">
		<button
			class="formarters bg-red-300 text-red-700 p-1 rounded-lg px-2"
			on:click={() => editor.chain().focus().undo().run()}
			>
			undo
		</button>
		<button
			class="formarters  bg-green-300 text-green-700 p-1 px-2 rounded-lg"
			on:click={() => editor.chain().focus().redo().run()}
			>
			redo
		</button>

    <button
      class="formarters  bg-orange-300 text-orange-700 p-1 px-2 rounded-lg"
      on:click={() => console.error('not saving')}
      >
      save draft
    </button>

    <button
      class="formarters  bg-blue-300 text-blue-700 p-1 px-2 rounded-lg"
      on:click={() => console.timeLog('not publishing')}
      >
      publish
    </button>
	</div>
{/if}

<div bind:this={element} />

<style>
</style>
