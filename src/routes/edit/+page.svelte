<script lang="ts">
	import { saveStoryFunction, updateStoryFunction } from '$lib/actions/storyActions';
	import EditChapter from '../../components/editors/EditChapter.svelte';

    export let data;
    let book = data.book
    let {richtext, plaintext, title, genre, subtitle, _id} = book
    //console.log(richtext)

    let loading = false

    let doc = { plaintext, richtext };

    async function handleSave(pub: boolean) {
		loading = true;
		let data = {
			title,
			subtitle,
			genre,
			richtext: doc.richtext,
			plaintext: doc.plaintext,
			published: pub,
            postId: _id,
		};
		const res = await updateStoryFunction(data);

		console.log(res);

        if (res.success) {
            book = res.doc
        }

		loading = false;
	}

</script>



<div class="p-5 test-css min-h-[80vh]">

	<a href="/books" class="p-2 px-3 rounded-md border-2 mb-10">Back</a>
	<div class="grid grid-cols-2 gap-2 my-4">
		<input placeholder="Title" class="p-2 w-full border-2 rounded-lg mb-2" value={title} disabled/>
		<input
			placeholder="Sub-Title"
			class="p-2 mb-2 w-full border-2 rounded-lg"
			bind:value={subtitle}
		/>
		<input placeholder="Genre" class="p-2 mb-2 w-full border-2 rounded-lg" value={genre} disabled/>

	</div>
	{#if loading}
	<div class="my-4 text-center">saving please wait...</div>
	{/if}
	<EditChapter bind:doc {handleSave} />
</div>