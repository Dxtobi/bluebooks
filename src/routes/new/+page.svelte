<script lang="ts">
	import { saveStoryFunction } from '$lib/actions/storyActions';

	import NewChapter from '../../components/editors/NewChapter.svelte';

	let doc: { plaintext: string; richtext: string };
	let title: string;
	let subtitle: string;
	let genre: string;
	let file: File;
	let loading = false;

	function handleFileInputChange(e: { target: { files: File[] } }) {
		// console.log()
		file = e.target.files[0];
	}

	async function handleSave(pub: boolean) {
		loading = true;
		let data = {
			title,
			subtitle,
			genre,
			coverArt: file,
			richtext: doc.richtext,
			plaintext: doc.plaintext,
			published: pub
		};

		const res = await saveStoryFunction(data);

		console.log(res);

		loading = false;
	}
</script>

<div class="p-5 test-css min-h-[80vh]">
	<div class="grid grid-cols-2 gap-2">
		<input placeholder="Title" class="p-2 w-full border-2 rounded-lg mb-2" bind:value={title} />
		<input
			placeholder="Sub-Title"
			class="p-2 mb-2 w-full border-2 rounded-lg"
			bind:value={subtitle}
		/>
		<input placeholder="Genre" class="p-2 mb-2 w-full border-2 rounded-lg" bind:value={genre} />

		<div class="flex items-center">
			<label
				for="image"
				class="cursor-pointer bg-blue-500 text-white px-5 mb-2 p-2 w-full rounded-md hover:bg-blue-600 line-clamp-1"
			>
				{file ? file.name : 'Select Image'}
			</label>

			<input
				type="file"
				id="image"
				name="image"
				accept="image/*"
				class="hidden"
				on:change={handleFileInputChange}
			/>
		</div>
	</div>
	{#if loading}
	<div class="my-4 text-center">Please wait...</div>
	{/if}
	<NewChapter bind:doc {handleSave} />
</div>
