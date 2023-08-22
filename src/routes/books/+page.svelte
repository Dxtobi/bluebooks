
<script lang="ts">
	import fakeBooks from '$lib/fakedb/fakebooks';
    import 'iconify-icon';
    let clicked = 'Latest';

    function getDays(params:string) {
        let days = new Date(params).getDate();
        let today = new Date().getDate();



        console.log(days, ":::", today, today-days, params)

        return days
    }

  </script>
  

<section class="p-5">
    <p>Good morning</p>


    <div class="w-full">
        <button  class="rounded-md w-full py-2 text-center bg-[#292d36] text-white my-5 ">Write Book</button>
    </div>

    <h1>Last Added</h1>
    <div class="scroll-container">
        {#each [1,2,3,4] as book}
            <a href={`/book/${book}`} class="scroll-item">
                <img src="adven.jpg" alt="" class="h-[200px] w-[130px] object-contain rounded-lg" />
                <div class="flex gap-5 my-2 items-baseline text-xl">
                    <iconify-icon icon="material-symbols:alarm-outline-rounded"></iconify-icon>
                    <div class="flex justify-center items-center ml-3">

                        <iconify-icon icon="system-uicons:pages" />
                        <span class="">4</span>
                    </div>
                </div>
            </a>
        {/each}
    </div>

    <div class="scroll-container">
        {#each ['Latest','Top Rated', 'Coming Soon'] as book}
            <button on:click={()=>clicked = book} class={`scroll-item ${clicked === book && 'font-bold text-xl'}`}>{book}</button>
        {/each}
    </div>


    <div class="inline-block md:grid grid-cols-2 gap-3">
        {#each fakeBooks as book}
           <div class="flex gap-3 items-start mb-3">
            <img src={book.coverArtUrl} alt='cover' class="h-[200px] w-[130px] object-fill  rounded-lg bg-slate-50"/>
            <div class="mx-2 relative h-[200px]">
                <h1 class="text-xl font-bold">{book.name}</h1>
                <h3 class="text-gray-500">{book.author}</h3>
                <div class="flex gap-2 items-baseline">
                   <div class="flex items-center"><iconify-icon icon="material-symbols:alarm-outline-rounded"></iconify-icon> <span>{getDays(book.releaseDate)}</span></div>
                   <div class="flex items-center"> <iconify-icon icon="system-uicons:pages" /><span>{book.numberOfPages}</span></div>
                </div>
                <div class={`rounded-lg ${book.genre.toLowerCase()} py-1 px-3 w-fit text-center bg-[#bbbbbb3b] absolute bottom-2 font-bold`}>{book.genre}</div>
            </div>
            <button class="border-2">
              <iconify-icon icon="material-symbols:bookmark-rounded" />
            </button>
           </div>
        {/each}
    </div>

</section>