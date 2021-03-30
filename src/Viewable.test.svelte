<script>
  import Viewable from './Viewable.svelte';

  let element;
</script>

<Viewable {element} {...$$props}>
  <div bind:this={element}>Hello World!</div>
</Viewable>
