<script>
  import Viewable from "@svelte-plugins/viewable";

  let element;
  let imageSource = null;

  const fn = async ({ src }) => {
    if (src) {
      console.log(src);
      imageSource = src;
    }
  };

  const rules = {
    // do something when this crosses the viewport
    countdown: { duration: 0, percentage: 0, fn, src: "https://media1.giphy.com/media/3ohc0Y1TI0vawx60Sc/200.gif" },
    // do something when this is 50% in view for 2 seconds
    rocket: { duration: 2, percentage: 50, fn, src: 'https://media0.giphy.com/media/dJezVlwfVulTykjRQj/source.gif' },
    // do something when this is 100% in view for 5 seconds
    party: { duration: 5, percentage: 100, fn, src: 'https://media.giphy.com/media/DhstvI3zZ598Nb1rFf/giphy.gif'  }
  };
</script>

<Viewable {rules} {element}>
  <img bind:this={element} src={imageSource} alt="testing" />
</Viewable>

<style>
  img {
    max-width: 300px;
  }
</style>
