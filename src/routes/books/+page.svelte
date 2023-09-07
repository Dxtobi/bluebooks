
<script lang="ts">
	import Write from './../../components/icons/Write.svelte';
	import Clock from '../../components/icons/Clock.svelte';
	import Pages from '../../components/icons/Pages.svelte';
	import Bookmark from '../../components/icons/Bookmark.svelte';
	import Star from '../../components/icons/Star.svelte';
    
	import { getRelativeTime } from '$lib/constants/myFunctions';
	
	
  
    export let data;
    const books = data.books;
   

    console.log(data.books)

    let user: { username: string; email: string; points: number; createdAt: Date; updatedAt: Date; _id: string; password: string; } | null
    $:user = data.user
  </script>
  

<section class="p-5">
   {#if user}
   <div class="flex justify-between">
    <div>
        <p>Good Day</p>
        <h2 class="font-bold text-xl">@{user.username}</h2>
    </div>
    <div class="flex text-sm text-white bg-[#fa784a] items-center justify-between rounded-full py-1 px-2 h-[30px]">
        <div class="flex w-[20px] h-[20px] bg-[#00000022] items-center justify-center rounded-full mr-2 text-white"><Star color='#fff'/></div>
        <div>{user.points} points</div>
    </div>
   </div>

   
   <div class="rounded-md w-full  text-center bg-[#292d36] text-white my-5 flex justify-between p-2">
    <a href="/new"  class=" w-1/2 flex justify-center gap-2 items-center" ><span><Write/></span>Write</a>
    <!-- <button class="border-l w-1/2">Post</button> -->
</div>


{:else}
<div class="mb-6">
    <p>Good Day</p>
    <h2 class="font-bold text-sm">Seams like you are logged out</h2>
</div>
   {/if}


    <h1>Popular</h1>
    <div class="scroll-container capitalize">
        {#each books.slice(0,4) as book}
            <a href={`/book/${book.title}/${book._id}`} class="scroll-item">
               {#if book.coverArtUrl === "null" }
               <div  class="h-[200px] w-[130px] object-fill  rounded-lg  bg-slate-300 grid place-content-center" ><div>
                <h3 class="p-5">{book.title}</h3>
            </div></div>
               {:else}
               <img src={book.coverArtUrl} alt="" class="h-[200px] w-[130px] object-contain rounded-lg" />
               {/if}
                <div class="flex gap-2 my-2 items-center">
                  <div class="flex items-center"><Clock/><span>{getRelativeTime(book.updatedAt)}</span></div>
                  <div class="flex items-center"><Pages/><span class="">{book.numberOfPages}</span></div>
                    
                </div>
            </a>
        {/each}
    </div>

    <div class="scroll-container">
       
            <button  class={`scroll-item`}>Latest</button>
       
    </div>


    <div class="inline-block md:grid grid-cols-2 gap-3 w-full capitalize">
        {#each books as book}
           <a href={`/book/${book.title}/${book._id}`} class="flex gap-3 items-start mb-3 w-full">
            {#if book.coverArtUrl === "null" }
            <div  class="h-[150px] w-[100px] object-fill  rounded-lg p-3 bg-slate-300 grid place-content-center" ><div>
                <h2>{book.title}</h2>
            </div></div>
            {:else}
            <img src={book.coverArtUrl} alt='cover' class="h-[150px] w-[100px] object-fill  rounded-lg bg-slate-50"/>
            {/if}
           
            <div class="mx-2 relative h-[150px] w-full overflow-scroll hide-scroll">
                <h2 class=" font-bold whitespace-nowrap ">{book.title}</h2>
                <h3 class="text-gray-500">{book.author.username}</h3>
                <div class="flex gap-2 items-baseline">
                   <div class="flex items-center"><Clock/> <span>{getRelativeTime(book.updatedAt)}</span></div>
                   <div class="flex items-center"> <Pages/><span>{book.numberOfPages}</span></div>
                </div>
                <div class={`rounded-lg ${book.genre.toLowerCase()} py-1 px-3 w-fit text-center bg-[#bbbbbb3b] absolute bottom-2 font-bold`}>{book.genre}</div>
            </div>
            <button class="border-2">
             <Bookmark/>
            </button>
           </a>
        {/each}
    </div>

</section>




