
<script lang="ts">
	import fakeBooks from '$lib/fakedb/fakebooks';
    import 'iconify-icon';
	import Clock from '../../components/icons/Clock.svelte';
	import Pages from '../../components/icons/Pages.svelte';
	import Bookmark from '../../components/icons/Bookmark.svelte';
	import { getRelativeTime } from '$lib/constants/myFunctions';
    let clicked = 'Latest';

  </script>
  

<section class="p-5">
    <p>Good morning</p>


    <div class="w-full">
        <button  class="rounded-md w-full py-2 text-center bg-[#292d36] text-white my-5 ">Write Book</button>
    </div>

    <h1>Last Added</h1>
    <div class="scroll-container">
        {#each fakeBooks.splice(0,4) as book}
            <a href={`/book/${book.name}`} class="scroll-item">
                <img src={book.coverArtUrl} alt="" class="h-[200px] w-[130px] object-contain rounded-lg" />
                <div class="flex gap-2 my-2 items-center">
                  <div class="flex items-center"><Clock/><span>{getRelativeTime(book.releaseDate)}</span></div>
                  <div class="flex items-center"><Pages/><span class="">{book.numberOfPages}</span></div>
                    
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
                   <div class="flex items-center"><Clock/> <span>{getRelativeTime(book.releaseDate)}</span></div>
                   <div class="flex items-center"> <Pages/><span>{book.numberOfPages}</span></div>
                </div>
                <div class={`rounded-lg ${book.genre.toLowerCase()} py-1 px-3 w-fit text-center bg-[#bbbbbb3b] absolute bottom-2 font-bold`}>{book.genre}</div>
            </div>
            <button class="border-2">
             <Bookmark/>
            </button>
           </div>
        {/each}
    </div>

</section>




