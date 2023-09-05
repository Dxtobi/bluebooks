<script>
	import { page } from "$app/stores";
	import { fly, slide } from "svelte/transition";
	import Clock from "../icons/Clock.svelte";
	import Likes from "../icons/Likes.svelte";
	import Pages from "../icons/Pages.svelte";
	import Star from "../icons/Star.svelte";
	import Profile from "../icons/Profile.svelte";
	import Home from "../icons/Home.svelte";
	import Search from "../icons/Search.svelte";
	import Theme from "./Theme.svelte";

	/**
	 * @type {{ user: any; }}
	 */
	 export let data
     /**
	 * @type {any}
	 */
     let user
    $:user = data.user


</script>
{#if $page.route.id !== '/book/[name]/[id]'}
<header class="fixed left-0 top-0 w-full p-3 flex justify-between z-50 backdrop-blur-[10px]" in:slide={{delay:200, duration:300}}  out:slide={{delay:200, duration:300}}>
	<div class="flex  items-center">
        
        <h2 class="custom-text font-bold text-xl">📖SBooks</h2>
    </div>

    <div class="flex gap-2 items-center">
       {#if !user }
        <a href="/auth" class="px-3 py-1 rounded-full bg-[#fa794a54] text-[#fa784a] font-bold">Create Account</a>        
       {/if}
	   <Theme/>
    </div>
</header>
{:else}
<a href="/books" class="fixed left-0  p-2 top-5 z-40 bg-[#ffffff54] backdrop-blur-[10px] white" in:fly={{x:200, delay:250, duration:400}}  out:fly={{x:200, delay:250, duration:400}}>
Back
</a>
<button class="fixed right-0  p-2 top-5 z-40 bg-[#ffffff54] backdrop-blur-[10px] white" in:fly={{x:-200, delay:250, duration:400}}  out:fly={{x:200, delay:250, duration:400}}>
    <Likes/>
</button>
{/if}
{#if $page.route.id !== '/book/[name]/[id]'}
<div class="md:w-1/3 w-fill fixed m-auto bottom-0 backdrop-blur-[10px] text-xl md:rounded-xl flex justify-between items-center px-5 p-2 bg-[#ffffff00] left-0 right-0 z-30" in:fly={{y:200, delay:250, duration:400}}  out:fly={{y:200, delay:250, duration:400}}>
    <a href="/books" class={`items-center flex gap-2 px-3 rounded-xl my-1 ${$page.url.pathname === '/books' && ' bg-[#3b8cdb] text-white'}`}><Home/>{$page.url.pathname === '/books' ? 'home': ''}</a>
    <a href="/search" class={`items-center flex gap-2 px-3 rounded-xl my-1 ${$page.url.pathname === '/search' && ' bg-[#3b8cdb] text-white'}`}><Search/>{$page.url.pathname === '/search' ? 'search': ''}</a>
    <a href="/profile" class={`items-center flex gap-2 px-3 rounded-xl my-1 ${$page.url.pathname === '/profile' && ' bg-[#3b8cdb] text-white'}`}><Profile/>{$page.url.pathname === '/profile' ? 'me': ''}</a>
    

</div>

{/if}