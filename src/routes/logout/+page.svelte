<script>
	import { goto } from '$app/navigation';

	//import { page } from "$app/stores";


    export let data

    if(!data.user){
       // invalidateAll()
        goto('/auth')
    }
</script>