<script>
// @ts-nocheck

	import { getRelativeTime } from '$lib/constants/myFunctions';
	import fakeBooks from '$lib/fakedb/fakebooks.js';
	import Clock from '../../../../components/icons/Clock.svelte';
	import Pages from '../../../../components/icons/Pages.svelte';
	import Star from '../../../../components/icons/Star.svelte';

    export let data
    
   const fd =  fakeBooks[0]
   console.log(data.book.title);
   const book = data.book;
</script>

<section>
    <div class="h-[70vh] relative -mt-[6rem]">
        <div class="w-full h-full absolute bg-[#2a2a2a51] backdrop-blur-[5px] z-30 ">
            <div class=" capitalize absolute left-0 right-0 top-0 bottom-0 m-auto z-40 min-w-[300px] min-h-[300px]  grid place-content-center">
                <div class="flex flex-col items-center gap-2">
               {#if book?.coverArtUrl === "null"}
               <div class="object-contain shadow-md shadow-[#df87ff62] h-[200px] w-[130px] grid place-content-center bg-gray-300 rounded-md">
               <h1> {book?.title}</h1>
                </div>
                {:else}
                <img src={book.coverArtUrl} alt="" class="object-contain shadow-md shadow-[#df87ff62] h-[200px] w-[130px] "/>
               {/if}
                <h1 class="w-1/2">{book.title}</h1>
                <h2 >{book.author.username}</h2>
                </div>
            </div>
            <div class="absolute bottom-5 flex items-center justify-between z-40 w-[80%] m-auto left-0 right-0 backdrop-blur-[5px] bg-[#111111d1] rounded-lg  p-2 text-white">
               <div class="text-center flex flex-col items-center   ">
                <Star/>
                <p>{parseFloat(book.totalRating/book.reviewCount)}</p>
               </div>
               <div class="text-center flex flex-col items-center  ">
                <Pages/>
                <p>{book?.numberOfPages}</p>
               </div>
               <div class="text-center flex flex-col items-center  ">
                <Clock/>
                <p>{getRelativeTime(book.updatedAt)}</p>
               </div>
            </div>
        </div>
        <img src={book.coverArtUrl} alt="" class="w-full h-full object-cover opacity-30 bg-gray-700"/>
    </div>
    <section class="p-5 relativ overflow-scroll hide-scroll">
        <div class="pl-5 border-l-4">
            <h1>Intro</h1>
            <p class="mt-3 line-clamp-6">
               {book.plaintext}</p>    
        </div>
        <a href={`/read/${book._id}`} class="w-[90%] p-3 rounded-lg bg-[#bbb] left-0 right-0 fixed bottom-2 m-auto md:w-1/3">Read for free</a>
    </section>
</section>
