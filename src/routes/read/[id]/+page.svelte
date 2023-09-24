<script>
	// @ts-nocheck

	import fakeBooks from '$lib/fakedb/fakebooks.js';
	import Speak from '../../../components/icons/Speak.svelte';
  // import { TextToSpeech, AvailableVoices } from '$lib/utils/TextTospeach';
	// import { onMount } from 'svelte';

  let selectedVoice = 0; // Default voice selection index
  export let data;

	const fd = fakeBooks[0];
	let content = data.book.richtext;
	const book = data.book;
  let speechPlaying = false; 
  let speechInstance = null;
  let availableVoices
  let tts
  // Asynchronously load voices when the component is mounted
  import('$lib/utils/TextTospeach')
    .then((module) => {
      availableVoices = module.AvailableVoices();
      tts =  module.TextToSpeech
    })
    .catch((error) => {
      console.error('Failed to load voices:', error);
    });

  // Speak with the selected voice
  const speakFunction = () => {
    if (typeof window !== 'undefined') {
      const text = content; // Your text to speak
      const selectedVoiceIndex = Number(selectedVoice);

      if (selectedVoiceIndex >= 0 && selectedVoiceIndex < availableVoices.length) {
        const selectedVoice = availableVoices[selectedVoiceIndex];
        speechInstance = tts(text, selectedVoice, () => {
          // Callback function to handle speech end
          speechPlaying = false;
        });
        speechPlaying = true;
      } else {
        // Handle invalid voice selection here
        console.error('Invalid voice selection');
      }
    }
  };

  // Stop speech
  const stopFunction = () => {
    console.log(speechInstance, speechPlaying)
    if ( speechPlaying) {
      console.log(speechInstance, '-----')
      window.speechSynthesis.pause();
      speechPlaying = false;
    }
  };
</script>



<section class="p-5">
	<div>{book.readBy.length} Reads</div>
	<h1 class="uppercase text-2xl">{book.title}</h1>
	<h2 class=" text-xl capitalize">{book.subtitle}</h2>
	<h2 class=" mb-10 capitalize">{book.author.username}</h2>

	<div
		dangerouslySetInnerHTML={{ __html: content }}
		contenteditable="false"
		bind:innerHTML={content}
	/>
</section>

{#if data?.nextRead?.title}
	<section class="mt-4 p-5">
		<div>Next</div>
		<a href={`/book/${book.title}/${book._id}`} class="text-xl">
			{data?.nextRead?.title}
		</a>
	</section>
{/if}

<div class="flex gap-4 fixed right-4 top-24 text-white bg-black rounded-[30px]">
	<a href="/books" class="bg-gray-800 p-2 px-3 gap-1 rounded-l-[30px]">Back</a>
  {#if speechPlaying}
  <button class="p-2 px-3 rounded-r-[30px] bg-black" on:click={stopFunction}>Stop</button>
    {:else}
    <button class="p-2 px-3 rounded-r-[30px] bg-black" on:click={speakFunction}><Speak /></button>
    
  {/if}
	
  
</div>

