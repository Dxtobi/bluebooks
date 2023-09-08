<script>
	import SearchComp from '../../components/others/SearchComp.svelte';
import Search from './../../components/icons/Search.svelte';
    
    let searchValue = '';
    let loading = false;
    /**
	 * @type {any[]}
	 */
    let searched = []

    

    async function SearchFunction() {
		loading = true;
		try {
			if (searchValue.trim() === '') {
				return (loading = false);
			}
			const response = await fetch('/api/stories?search=' + searchValue, {
				method: 'GET',
				headers: {
					'content-type': 'application/json'
				}
			});

			searched = await response.json();
			console.log(searched);
			loading = false;
			return searched;
		} catch (error) {
			loading = false;
			console.log(error);
		}
	}
</script>

<div class="p-5">
    <div class=" flex items-center dark:border-[#ffffff] border-[#000000] rounded-2xl border-2 bg-[#fa794a42] p-1">
        <input
            class="w-full px-4 py-2 rounded-2xl bg-transparent"
            type="text"
            id="search"
            name="search"
            placeholder="Search Book"
            bind:value={searchValue}
        />
        <button class="dark:bg-white dark:text-black bg-black text-white px-4 py-2 rounded-r-lg" on:click={SearchFunction}>
            <Search/>
        </button>
    </div>

    {#if loading}
        <div class="w-full text-center p-5 ">Please wait</div>
    {:else}
        <div class="columns-2 md:columns-3 gap-5  grid-cols-2">
            {#each searched as sch}
               <SearchComp book={sch}/>
            {/each}
        </div>
    {/if}
</div>