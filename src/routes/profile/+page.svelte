<script lang="ts">
    export let data
    console.log(data)
</script>


<section class="p-5">
    <section class=" text-center pb-6 border-b-2">
        <h1>{data.user?.username}</h1>
        <h3>{data.user?.email}</h3>
        <p>({data.user?.points})</p>
        <a href="/logout">Logout</a>
    </section>

    <section class="py-5">
        <div class="flex items-center gap-4 my-10">
            <div class="flex gap-2 items-center">
                <div class="w-5 h-5 bg-green-300 "/>
                <p>published</p>
            </div>

            <div class="flex gap-2 items-center">
                <div class="w-5 h-5 bg-yellow-100 "/>
                <p>Draft</p>
            </div>
        </div>
         {#each data.books as book }
            <div class={`flex justify-between items-center capitalize py-4 border-b-2 border-b-white px-2  ${book.published === 'true' ?' bg-green-100':' bg-yellow-100'}`} >
                <div>
                    <h1>{book.title}</h1>
                    <p>{book.subtitle}</p>
                </div>
                <div class="flex justify-between gap-1">
                    <a href={`/edit?id=${book._id}`} class="  bg-white text-black rounded-md py-2 px-4 ">Edit</a>
                    <button class=" border-2 rounded-md py-2 px-4 bg-red-500 text-white">Delete</button>
                </div>
            </div>
         {/each}
    </section>
</section>