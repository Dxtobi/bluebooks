<script>
    // @ts-nocheck
    
        import { getRelativeTime } from '$lib/constants/myFunctions';
        import fakeBooks from '$lib/fakedb/fakebooks.js';
      
        export let data
        
       const fd =  fakeBooks[0]
    //   console.log(data.book);
       let content =data.book.richtext
       const book = data.book;
       function clangles(params) {
        console.log(params)
       }
    </script>
    
    <section class="p-5">
      <h1 class="uppercase  text-2xl">{book.title}</h1>
      <h2 class=" text-xl capitalize">{book.subtitle}</h2>
      <h2 class=" mb-10 capitalize">{book.author.username}</h2>
      <div  dangerouslySetInnerHTML={{ __html: content }} contenteditable=false bind:innerHTML={content} ></div>
    </section>
    
    <div class="fixed w-[90%] md:w-1/3 bottom-16 left-0 right-0 m-auto rounded-full p-3 text-white flex gap-2 bg-[#1f32ffd4] backdrop-blur-[6px]" on:drag={clangles} >
      <a href="/books">Back</a>
      <button>Listen to book</button>
    </div>