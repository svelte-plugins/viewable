<script>
  import Viewable from './viewable.svelte';

  let element;
</script>

<Viewable {element} {...$$props}>
  <div bind:this={element}>Hello World!</div>
</Viewable>
