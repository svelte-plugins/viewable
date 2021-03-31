<script>
  import Viewable from "@svelte-plugins/viewable";

  // you can use a single callback or separate callbacks for each rule
  const fn = ({ percentage, duration, rule }) => {
    console.log(`${percentage}% of the element was visible for at least ${duration} consecutive seconds.`);
    // update active rule
    activeRule = rule;
  }

  const rules = {
    // do something when this crosses the viewport
    whenVisible: { duration: 2, percentage: 40, fn },
    // do something when this is 50% in view for 4 seconds
    whenFiftyForOne: { duration: 4, percentage: 50, fn },
      // do something when this is 100% in view for 6 seconds
    whenHundredForFour: { duration: 6, percentage: 100, fn }
  };

  export let enableObstructionDetection = false;

  let element;
  let duration;
  let percent;
  let percentX;
  let percentY;
  let activeRule = null;
  let debug = true;
</script>

<Viewable bind:duration bind:percent bind:percentY bind:percentX {rules} {element} {enableObstructionDetection} {debug}>
  <div bind:this={element} class={`${activeRule}`}>
    <p>Duration: {duration}s</p>
    <p>Viewable area: {percent}% x: {percentX}% y: {percentY}%</p>
  </div>
</Viewable>

<style>
  div {
    background-color: #ccc;
    border-radius: 2px;
    padding: 20px;
    height: 25vh;
  }

  div.whenVisible {
    background-color: #50e3c2;
    color: #fff;
  }

  div.whenFiftyForOne {
    background-color: #4a90e2;
    color: #fff;
  }

  div.whenHundredForFour {
    background-color: #fd8e82;
    color: #fff;
  }
</style>
