<script>
	export let name;
</script>

<main>
	<h1 class="heading">Hello name
	<span class="heading__this">this</span></h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>

<style lang="scss">
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
		
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	
	}
	.heading{
		&__this{
			color: black;
		}
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>