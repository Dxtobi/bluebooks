<script >
    let darkMode = false;

    function handleSwitchDarkMode() {
        darkMode = !darkMode;

        darkMode
            ? document.documentElement.classList.add('dark')
            : document.documentElement.classList.remove('dark');
    }
</script>

<div>
    <input checked={darkMode} on:click={handleSwitchDarkMode} type="checkbox" id="theme-toggle" />
    <label for="theme-toggle" />
</div>

<style lang="postcss">
    #theme-toggle {
        @apply invisible;
    }

    #theme-toggle + label {
        @apply inline-block cursor-pointer h-[25px] w-[25px]  rounded-full duration-300 content-[''];
    }

    #theme-toggle:not(:checked) + label {
        @apply bg-white;
        box-shadow: inset 10px 12px 1px 1px #010108;
    }

    #theme-toggle:checked + label {
        @apply bg-[#50505000];
        box-shadow: inset -10px -12px 1px 1px #f0f0f0;
    }
</style>