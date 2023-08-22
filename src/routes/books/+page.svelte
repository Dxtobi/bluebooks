
<script lang="ts">
	import fakeBooks from '$lib/fakedb/fakebooks';
    import 'iconify-icon';
    let clicked = 'Latest';

  </script>
  

<section class="p-5">
    <p>Good morning</p>
    <div>
        <p class="text-bold">Top Sheaves</p>
    </div>

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


    <div class="">
        {#each fakeBooks as book}
           <div class="flex gap-3 items-start mb-3">
            <img src={book.coverArtUrl} alt='' class="h-[150px] w-[100px] object-contain  rounded-lg"/>
            <div class="mx-2">
                <h1 class="text-2xl font-bold">{book.name}</h1>
                <h3 class="text-gray-500">{book.author}</h3>
                <div class="flex gap-2">
                   <div><iconify-icon icon="material-symbols:alarm-outline-rounded"></iconify-icon> <p>{book.releaseDate}</p></div>
                   <div class="ml-3"> <iconify-icon icon="system-uicons:pages" /><p>{book.numberOfPages}</p></div>
                </div>
                <div class="rounded-lg py-1 px-3 bg-[#bbbbbb3b]">{book.genre}</div>
            </div>
            <button class="border-2">
              <iconify-icon icon="ic:outline-bookmark-border" />
            </button>
           </div>
        {/each}
    </div>

</section>