<script>
  import Viewable from "@svelte-plugins/viewable";

  export let enableObstructionDetection = false;

  let events = [];
  let element;
  let duration;
  let percent;
  let percentX;
  let percentY;
  let activeRule = null;
  let debug = true;

  // you can use a single callback or separate callbacks for each rule
  const fn = ({ percentage, duration, rule }) => {
    events = [...events, `${percentage}% of the element was visible for at least ${duration} consecutive seconds. #${rule}`];
    // update active rule
    activeRule = rule;
  }

  const rules = {
    // do something when this crosses the viewport
    whenFourtyForTwo: { duration: 2, percentage: 40, fn },
    // do something when this is 50% in view for 4 seconds
    whenFiftyForFour: { duration: 4, percentage: 50, fn },
      // do something when this is 100% in view for 6 seconds
    whenHundredForSix: { duration: 6, percentage: 100, fn }
  };
</script>

<Viewable bind:duration bind:percent bind:percentY bind:percentX {rules} {element} {enableObstructionDetection} {debug}>
  <div bind:this={element} class={`${activeRule}`}>
    <slot></slot>

    <p>Duration: {duration}s</p>
    <p>Viewable area: {percent}% x: {percentX}% y: {percentY}%</p>

    {#if events.length}
      {#each events as event}
        <p>{event}</p>
      {/each}
    {/if}
  </div>
</Viewable>

<style>
  div {
    background-color: #ddd;
    border-radius: 2px;
    height: 100%;
    padding: 20px;
  }

  div.whenFourtyForTwo {
    background-color: #50e3c2;
    color: #fff;
  }

  div.whenFiftyForFour {
    background-color: #4a90e2;
    color: #fff;
  }

  div.whenHundredForSix {
    background-color: #fd8e82;
    color: #fff;
    position: relative;
  }

  div.whenHundredForSix:before {
    background: rgba(255,255,255, .75);
    border-radius: 100%;
    bottom: 20px;
    content: "🎉";
    height: 100px;
    font-size: 3em;
    left: calc(50% - 50px);
    line-height: 100px;
    position: absolute;
    right: 0;
    text-align: center;
    top: calc(50% - 50px);
    width: 100px;
  }
</style>
