<script>
	import Footer from './../components/layouts/Footer.svelte';
	import Header from '../components/layouts/Header.svelte';
	import './styles.css';

	export let data
</script>

<div class="app">
	<Header {data}/>

	
	<main class="py-24 md:w-[60%] w-full m-auto">
		<slot />
	</main>

	<Footer/>
</div>

