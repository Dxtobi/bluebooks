<script>
	import { applyAction } from '$app/forms';
	import { goto, invalidate, invalidateAll } from '$app/navigation';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';


	/**
	 * @type {string | null}
	 */
	let form = null;

	let name = '';
	let email = '';
	let password = '';
	let sending = false;
	let next = false;

	$: name = name.split(' ').join('')
	const registerFunction = async () => {
		sending = true;
		const data = {
			name,
			email,
			password
		};
		const response = await fetch('/api/auth', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		const result = await response.json();
		if (result.error) {
			sending = false;
			//console.log(result.message.body.message)
			return form = result.data.body.message;
		}
		if (result.type === 'success') {
			// re-run all `load` functions, following the successful update
			await invalidateAll();
			
			
			
			
		}
		applyAction(result);
		sending = false;
		return next = true;
		
		
	};


	onMount(()=>{
		invalidateAll()
	})


	const loginFunction = async () => {
		sending = true;
		const data = {
			name,
			email,
			password
		};
		const response = await fetch('/api/auth', {
			method: 'PUT',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		const result = await response.json();
		if (result.error) {
			sending = false;
			console.log(result.data)
			return form = result.data.body.message;
		}
		if (result.success) {
			// re-run all `load` functions, following the successful update
			await invalidateAll();
		}
		
			sending = false;
			console.log(result);
			applyAction(result);
			goto('/books', { invalidateAll: true})

			
		
	};
</script>

<div class="min-h-screen w-full flex items-center flex-col gap-10 pt-10 relative">
	
{#if !next}
	<div transition:fly={{y:100, delay:200}} class="py-10 absolute top-0 right-0 left-0 w-[90%] m-auto bg-[#ffffff3a] flex flex-col gap-5 justify-center items-center backdrop-blur-[10px] rounded-lg">
		<h1 class="text-xl font-semibold my-1 custom-text">Create a new Account</h1>
		<form method="POST" class="w-[90%]" on:submit|preventDefault={registerFunction}>
			<div class="w-full mb-5">
				<label for="name" class="block text-sm font-medium my-1">username</label>
				<input
					id="name"
					name="name"
					type="text"
					required
					class="mt-1 px-4 py-2 w-full border-2 rounded-md  bg-transparent gradient-border"
					bind:value={name}
				/>
			</div>
			<div class="w-full mb-5">
				<label for="email" class="block text-sm font-medium my-1">Email</label>
				<input
					id="email"
					name="email"
					type="email"
					required
					class="mt-1 px-4 py-2 w-full border-2 rounded-md  bg-transparent gradient-border"
					bind:value={email}
				/>
			</div>
		
			
			<div>
				<label for="password" class="block text-sm font-medium my-1">Password</label>
				<input
					id="password"
					name="password"
					type="password"
					required
					class="mt-1 px-4 py-2 w-full border-2 rounded-md  bg-transparent gradient-border"
					bind:value={password}
				/>
			</div>

			{#if form}
				<p class="text-red-800 my-3 capitalize">{form}</p>
			{/if}

			<button
				type="submit"
				class="mt-4 px-6 py-2 bg-[#1590f7] text-white "
				disabled={sending}>{sending ? 'Please wait...' : 'Register'}</button
			>
			<div class="mt-4 text-sm text-gray-400">
				Have an account? <button on:click={()=>next=!next} class="text-[#1590f7] hover:underline">Login</button>
			</div>
		</form>
	</div>

{:else}

<div transition:fly={{y:100, delay:200}}  class="py-10 absolute top-0 right-0 left-0 w-[90%] m-auto bg-[#ffffff3a] flex flex-col gap-5 justify-center items-center backdrop-blur-[10px] rounded-lg">
	<h1 class="text-xl font-semibold my-1 custom-text">Login</h1>
	<form method="POST" class="w-[90%]" on:submit|preventDefault={loginFunction}>
		<div class="w-full mb-5">
			<label for="name" class="block text-sm font-medium my-1">Username | Email</label>
			<input
				id="name"
				name="name"
				type="text"
				required
				class="mt-1 px-4 py-2 w-full border-2 rounded-md  bg-transparent gradient-border"
				bind:value={name}
			/>
		</div>
		<div>
			<label for="password" class="block text-sm font-medium my-1">Password</label>
			<input
				id="password"
				name="password"
				type="password"
				required
				class="mt-1 px-4 py-2 w-full border-2 rounded-md  bg-transparent gradient-border"
				bind:value={password}
			/>
		</div>

		{#if form}
			<p class="text-red-800 my-3 capitalize">{form}</p>
		{/if}

		<button
			type="submit"
			class="mt-4 px-6 py-2 bg-[#1590f7] text-white "
			disabled={sending}>{sending ? 'Please wait...' : 'Login'}</button
		>
		<div class="mt-4 text-sm text-gray-400">
			No account? <button  class="text-[#1590f7] hover:underline" on:click={()=>next=!next}>Register</button>
		</div>
	</form>
</div>
{/if}
</div>