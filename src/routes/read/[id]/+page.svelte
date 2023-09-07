<script>
    // @ts-nocheck
    
        import { getRelativeTime } from '$lib/constants/myFunctions';
        import fakeBooks from '$lib/fakedb/fakebooks.js';
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
    </script>
    
    <section class="p-5">
      <div>{book.readBy.length} Reads</div>
      <h1 class="uppercase  text-2xl">{book.title}</h1>
      <h2 class=" text-xl capitalize">{book.subtitle}</h2>
      <h2 class=" mb-10 capitalize">{book.author.username}</h2>
      
      <div  dangerouslySetInnerHTML={{ __html: content }} contenteditable=false bind:innerHTML={content} ></div>
    </section>
    
    <Dragable>
     
       <div class="flex gap-1">
        <a href="/books" class="bg-gray-800 p-1 px-3 gap-1">Back</a>
        <button><Speak/></button>
       </div>
      
    </Dragable>