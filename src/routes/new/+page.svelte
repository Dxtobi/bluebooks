<script lang="ts">
	import { saveStoryFunction } from '$lib/actions/storyActions';

	import NewChapter from '../../components/editors/NewChapter.svelte';

	type SelectedStory = string & {
		title:string,
		subtitle:string,
		genre:string,
		_id:string
	}
	let doc: { plaintext: string; richtext: string };
	let title: string;
	let subtitle: string;
	let genre: string;
	let file: File;
	let loading = false;
	let followUpStory:  SelectedStory;
	let mainStory: string
	let select = {
		title: '',
		subtitle: '',
		genre: ''

	}



	$:assignValues(followUpStory) 
	
	$:{
		title=followUpStory?.title || ''
		genre=followUpStory?.genre || ''
		mainStory = followUpStory?._id
		console.log(followUpStory)
	}
	function assignValues(state: string) {
		console.log('new')
		return MS.find(story => story.title === state) || {};
		
	}

	
	export let data
	const MS = data.myStories;
	//console.log(data)
	function handleFileInputChange(e:any) {
		//console.log()
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
			published: pub,
			followUpStory,
			mainStory
		};
		const res = await saveStoryFunction(data);

		console.log(res);

		loading = false;
	}

	


</script>

<div class="p-5 test-css min-h-[80vh]">

	<a href="/books" class="p-2 px-3 rounded-md border-2 mb-10">Back</a>
	<div class="grid grid-cols-2 gap-2 my-4">
		<input placeholder="Title" class="p-2 w-full border-2 rounded-lg mb-2" bind:value={title} />
		<input
			placeholder="Sub-Title"
			class="p-2 mb-2 w-full border-2 rounded-lg"
			bind:value={subtitle}
		/>
		<input placeholder="Genre" class="p-2 mb-2 w-full border-2 rounded-lg" bind:value={genre} />

		<select placeholder="Genre" class="bg-gray-500 text-white p-2 mb-2 w-full border-2 rounded-lg" bind:value={followUpStory} >
			<option value={''}>Add to Story</option>
			{#each MS as ms }
			<option value={ms} class=" capitalize ">{ms.title}-<span class="text-gray-400">({ms.subtitle})</span></option>
			{/each}
		</select>
		
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
				on:input={handleFileInputChange}
			/>
		</div>

	</div>
	{#if loading}
	<div class="my-4 text-center">Please wait...</div>
	{/if}
	<NewChapter bind:doc {handleSave} />
</div>
