<script>
    // @ts-nocheck
    
        import { getRelativeTime } from '$lib/constants/myFunctions';
        import fakeBooks from '$lib/fakedb/fakebooks.js';
	import { TextToSpeech } from '$lib/utils/TextTospeach';
	import Speak from '../../../components/icons/Speak.svelte';
	import Dragable from '../../../components/others/Dragable.svelte';
      
        export let data
        
       const fd =  fakeBooks[0]
    //   console.log(data.book);
       let content =data.book.richtext
       const book = data.book;
      //  console.log(book.readBy)
       function clangles(params) {
        console.log(params)
       }

const speakFunction = ()=>{
  TextToSpeech(data.book.plaintext)
}
    </script>
    
    <section class="p-5">
      <div>{book.readBy.length} Reads</div>
      <h1 class="uppercase  text-2xl">{book.title}</h1>
      <h2 class=" text-xl capitalize">{book.subtitle}</h2>
      <h2 class=" mb-10 capitalize">{book.author.username}</h2>
      
      <div  dangerouslySetInnerHTML={{ __html: content }} contenteditable=false bind:innerHTML={content} ></div>
    </section>
    
 {#if data?.nextRead?.title}
 <section class="mt-4 p-5">
  <div>Next</div>
  <a href={`/book/${book.title}/${book._id}`} class="text-xl">
    {data?.nextRead?.title}
  </a>
  </section>
 {/if}
     
       <div class="flex gap-4 fixed right-4 top-24  text-white bg-black rounded-[30px]">
        <a href="/books" class="bg-gray-800 p-2 px-3 gap-1 rounded-l-[30px]">Back</a>
        <button class="p-2 px-3 rounded-r-[30px] bg-black" on:click={speakFunction}><Speak/></button>
       </div>
      
