<script>
  import ContainerExample from './ContainerExample.svelte';

  let enableObstructionDetection = false;
  let status = 'Hidden';

  const handleClick = () => (enableObstructionDetection = !enableObstructionDetection);

  $: status = enableObstructionDetection ? 'Visible' : 'Hidden';
</script>

{#if enableObstructionDetection}
  <div id="overlay"></div>
{/if}

<header>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <button id="obstructions" class="badge" data-testid="toggle-obstructions" class:on={enableObstructionDetection} on:click={handleClick}>
      Obstructions: {status}
    </button>
    <p class="badge"><b>Hint:</b> Open dev console to see debug output.</p>
  </div>
</header>

<main>
  <div class="container flex flex-col px-4 m-8 mx-auto space-y-4 sm:px-6 lg:px-8">
    <div class="flex justify-between">
      <div class="w-1/2 mr-4 h-64 block"></div>
      <div class="w-1/2 flex flex-col space-y-2">
        <div class="w-full h-3 block"></div>
        <div class="w-full h-2 block"></div>
        <div class="w-full h-2 block"></div>
        <div class="w-full h-2 block"></div>
        <div class="w-full h-2 block"></div>
        <div class="w-full h-2 block"></div>
        <div class="w-3/4 h-2 block"></div>
      </div>
    </div>
    <div class="flex flex-col space-y-2">
      <div class="w-full h-2 block"></div>
      <div class="w-full h-2 block"></div>
      <div class="w-full h-2 block"></div>
      <div class="w-full h-2 block"></div>
      <div class="w-full h-2 block"></div>
      <div class="w-full h-2 block"></div>
      <div class="w-full h-2 block"></div>
      <div class="w-1/5 h-2 block"></div>
    </div>
    <div class="flex">
      <div class="flex-1 h-64 block" data-testid="top">
        <ContainerExample enableObstructionDetection={enableObstructionDetection} />
      </div>
    </div>
    <div class="flex flex-col w-4/6 space-y-2">
      <div class="w-full h-2 block"></div>
      <div class="w-full h-2 block"></div>
      <div class="w-full h-2 block"></div>
      <div class="w-3/5 h-2 block"></div>
    </div>
    <div class="flex items-stretch h-48">
      <div class="flex-1 mr-4 block"></div>
      <div class="flex-1 block"></div>
      <div class="flex-1 ml-4 block"></div>
    </div>
    <div class="flex flex-col w-4/6 space-y-2">
      <div class="w-full h-2 block"></div>
      <div class="w-full h-2 block"></div>
      <div class="w-full h-2 block"></div>
      <div class="w-3/5 h-2 block"></div>
    </div>
    <div class="flex">
      <div class="flex-1 h-64 block" data-testid="middle">
        <ContainerExample enableObstructionDetection={enableObstructionDetection}>
          Hello World!
        </ContainerExample>
      </div>
    </div>
    <div class="flex flex-col space-y-2">
      <div class="w-full h-2 block"></div>
      <div class="w-3/4 h-2 block"></div>
      <div class="w-2/3 h-2 block"></div>
      <div class="w-full h-2 block"></div>
      <div class="w-full h-2 block"></div>
      <div class="w-4/5 h-2 block"></div>
      <div class="w-3/5 h-2 block"></div>
      <div class="w-full h-2 block"></div>
    </div>
    <div class="flex items-stretch h-48">
      <div class="flex-1 mr-2 block"></div>
      <div class="flex-1 ml-2 block"></div>
    </div>
    <div class="flex items-stretch h-48">
      <div class="flex-1 mr-4 block"></div>
      <div class="flex-1 block" data-testid="bottom">
        <ContainerExample />
      </div>
      <div class="flex-1 ml-4 block"></div>
    </div>
    <div class="flex flex-col space-y-2">
      <div class="w-full h-2 block"></div>
      <div class="w-full h-2 block"></div>
      <div class="w-full h-2 block"></div>
    </div>
    <div class="flex flex-col w-4/6 space-y-2">
      <div class="w-full h-2 block"></div>
      <div class="w-full h-2 block"></div>
      <div class="w-full h-2 block"></div>
      <div class="w-3/5 h-2 block"></div>
    </div>
    <div class="flex items-stretch h-48">
      <div class="flex-1 mr-4 block"></div>
      <div class="flex-1 block"></div>
      <div class="flex-1 ml-4 block"></div>
    </div>
    <div class="flex">
      <div class="flex-1 h-64 block"></div>
    </div>
    <div class="flex flex-col w-4/6 space-y-2">
      <div class="w-full h-2 block"></div>
      <div class="w-full h-2 block"></div>
      <div class="w-full h-2 block"></div>
      <div class="w-3/5 h-2 block"></div>
    </div>
  </div>
</main>

<style>
  header {
    background-color: #fff;
    box-shadow: 0 1px 8px rgba(0,0,0, .2);
    left: 0;
    padding: 8px 0;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 90;
  }

  main {
    position: relative;
    top: 40px;
  }

  .badge {
    background-color: #ffeaad;
    border-radius: 4px;
    display: inline-block;
    color: #111;
    padding: 8px 16px;
  }

  .block {
    background: #f0f0f0;
  }

  .container {
    min-width: 800px;
  }

  [data-testid="bottom"] {
    font-size: .7em;
  }

  #obstructions {
    background: #eee;
    border: 0;
    margin-right: 8px;
  }

  #obstructions.on {
    background-color: #4a90e2;
    color: #fff;
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
    background: rgba(145, 145, 145, .1);
    bottom: 25%;
    content: " ";
    left: 200px;
    position: fixed;
    right: 50%;
    top: 15%;
    z-index: 99;
  }
</style>
