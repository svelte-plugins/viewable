<script>
	import ContainerExample from './ContainerExample.svelte';
  import ImageExample from "./ImageExample.svelte";

	let obstructions = false;

  const handleClick = () => (obstructions = !obstructions);
</script>

<button id="obstructions" on:click={handleClick}>
	Toggle Obstructions
</button>

Scroll down...

{#if obstructions}
  <div id="overlay"></div>
{/if}

<div class="container">
	<p>Open dev console to see debug output.</p>
	<ContainerExample />
</div>

<div class="container">
  <ImageExample />
</div>

<div class="container">
	<ContainerExample />
</div>

<style>
	#obstructions {
    position: fixed;
		right: 0;
		top: 0;
	}

	#overlay {
		background: rgba(0, 0, 0, .1);
		bottom: 30%;
		left: 10px;
		position: fixed;
		right: 60%;
		top: 30%;
		z-index: 99;
	}

	#overlay:before {
		background: rgba(93, 91, 92, .1);
		bottom: 30%;
		content: " ";
		left: 80%;
		position: fixed;
		right: 0;
		top: 30%;
		z-index: 99;
	}

	#overlay:after {
		background: rgba(45, 45, 45, .1);
		bottom: 25%;
		content: " ";
		left: 200px;
		position: fixed;
		right: 50%;
		top: 15%;
		z-index: 99;
	}
	.container {
		border-bottom: 1px solid #eee;
		height: 100vh;
	  padding-top: 100vh;
	}
</style>
