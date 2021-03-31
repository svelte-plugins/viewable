<script>
  import { onDestroy, afterUpdate, tick } from 'svelte';

  /**
   * HTML Element to track
   * @type {null | HTMLElement}
   */
  export let element;
  /**
   * Objecting containging viewability rulesets
   * @type {null | Object}
   */
  export let rules;
  /**
   * Debug flag to enable console output
   * @type {Boolean}
   */
  export let debug = false;
  /**
   * Current in-view duration of the element
   * @type {Number}
   */
  export let duration = 0;
  /**
   * Current in-view percentage of the element
   * @type {Number}
   */
  export let percent = 0;
  /**
   * Current horizontal in-view percentage of the element
   * @type {Number}
   */
  export let percentX = 0;
  /**
   * Current vertical in-view percentage of the element
   * @type {Number}
   */
  export let percentY = 0;
  /**
   * Rate to sample once in-view
   * @type {Number}
   */
  export let intervalRate = 200;
  /**
   * Grid points for determining viewable percentage
   * @type {Number}
   */
  export let gridSize = 20;
  /**
   * Enables checking for elements obstructing the tracked elements view (popups, modals, overlays, etc.)
   * @type {Boolean}
   */
  export let enableObstructionDetection = false;

  let ready = null;
  let timer = null;

  const definitions = [];

  const logger = (...args) => debug && console.log(...args);

  // Creates a rule definition for each viewabiltiy
  // rule defined in `rules`
  const createRuleDefinitions = () => {
    for (let rule in rules) {
      const ruleDef = rules[rule];
      const { duration = 0, percentage = 0, fn, ...rest } = ruleDef;
      const threshold = percentage / 100;

      const callback = function (definition) {
        fn(definition);
        logger('[ Viewable Rule ]\n' + JSON.stringify({ ...definition }, null, 2));
      };

      const definition = {
        ...rest,
        percentage,
        threshold,
        duration,
        callback,
        rule,
        history: null
      };

      definitions.push(definition);

      track(definition);
    }
  };

  /**
   * Creates a grid of container x/y coords to use for obstruction checking
   * @param  {Object} rect     Container getBoundingClientRect object
   * @return {Array}           Returns a multidimensional array of container x / y coords
   */
  const createGrid = (rect) => {
    const size = gridSize + 1;
    const x = Math.floor(rect.width / size);
    const y = Math.floor(rect.height / size);
    const left = Math.max(0, rect.left);
    const top = rect.top;
    const grid = [];

    for (let i = 1; i < size; i++) {
      const xPoint = left + x * i;

      for (let j = 1; j < size; j++) {
        const yPoint = top + y * j;
        grid[grid.length] = [xPoint, yPoint];
      }
    }

    return grid;
  };

  /**
   * Determine if there's an obstruction to the container overlays, overflow, etc...
   * @param  {Object}  rect       Container rect
   * @param  {Number}  threshold  Current position minimum view threshold
   * @return {Boolean}            Returns true if the viewable area meets the minimum acceptable threshold
   *
   * Example 5x5 Grid
   * |----|----|----|----|----|
   * |    |    |    |    |  x |
   * |----|----|----|----|----|
   * |    |  x |  x |    |    |
   * |----|----|----|----|----|
   * |    |    |  x |    |    |
   * |----|----|----|----|----|
   * |    |    |    |    |    |
   * |----|----|----|----|----|
   * |    |    |    |    |  x |
   * |----|----|----|----|----|
   *
   * 5 / 25 * 100 = 20% obstructed / 80% viewable
   */
  const isObstructed = (rect, threshold) => {
    const grid = createGrid(rect);
    let obstructed = 0;

    for (let i = 0, k = grid.length; i < k; i++) {
      const x = grid[i][0];
      const y = grid[i][1];
      const elementAtPoint = document.elementFromPoint(x, y);

      if (elementAtPoint !== element && !element.contains(elementAtPoint)) {
        obstructed++;
      }
    }

    const minimum = threshold * 100;
    const viewable = 100 - (obstructed / grid.length) * 100;
    const viewableMinimumNotMet = viewable < minimum;

    if (viewableMinimumNotMet) {
      percent = viewable.toFixed(0);
    }

    return viewableMinimumNotMet;
  };

  /**
   * Returns the current viewport dimensions
   * @return {Object} An object containing the viewport width and height
   */
  const getViewport = () => {
    const body = document.body;
    const docElement = document.documentElement;

    return {
      height: window.innerHeight || docElement.clientHeight || (body && body.clientHeight),
      width: window.innerWidth || docElement.clientWidth || (body && body.clientWidth)
    };
  };

  /**
   * Identifies the proportion of an element within the viewport
   * @param  {Number} threshold The required minimum viewable area of the element (from the rule)
   * @return {Number}           The percentage of the elements viewable area
   */
  const inViewRatio = (threshold) => {
    const viewport = getViewport();
    const rect = element.getBoundingClientRect();
    const visibleHeight = Math.max(0, Math.min(rect.bottom, viewport.height) - Math.max(rect.top, 0));
    const visibleWidth = Math.max(0, Math.min(rect.right, viewport.width) - Math.max(rect.left, 0));
    const visibleHeightRatio = visibleHeight / (rect.height || element.offsetHeight) || 0;
    const visibleWidthRatio = visibleWidth / (rect.width || element.offsetWidth) || 0;
    const percentageViewable = Math.max(0, visibleHeightRatio + visibleWidthRatio - 1);

    percentX = (visibleWidthRatio * 100).toFixed(0);
    percentY = (visibleHeightRatio * 100).toFixed(0);
    percent = (percentageViewable * 100).toFixed(0);

    if (enableObstructionDetection && isObstructed(rect, threshold)) {
      return 0;
    }

    return percentageViewable;
  };

  /**
   * Checks the viewability of each position definition. If any
   * definition meets their viewability requirements we trigger
   * the corresponding callback function
   */
  const checkViewability = () => {
    const size = definitions.length;

    for (let i = 0; i < size; i++) {
      const definition = definitions[i];

      if (definition) {
        if (inViewRatio(definition.threshold) < definition.threshold) {
          // if the element has left the viewport > reset history
          definition.history = null;
        } else {
          // element entered view
          if (!definition.history) {
            duration = 0;
            definition.history = Date.now();
          }

          duration = (Date.now() - definition.history) / 1000;

          logger(`[ Tracking - ${duration} - ${definition.rule}]`);

          // check if threshold has been met or exceeded
          if (duration >= definition.duration) {
            // if definition timer, reset it
            // if observer, unobserve
            if (definition.observer) {
              definition.observer.unobserve(element);
            }
            // issue callback to fire beacon
            definition.callback(definition);
            // update history timestamp
            definition.history = Date.now();
            // remove definition so we aren't duplicating events
            definitions.splice(i, 1);
            i = i - 1;

            logger(definitions);

            if (!definitions.length) {
              logger(`[ Finished - ${definition.history} ]`);

              if (timer) {
                clearInterval(timer);
                timer = null;
              }

              break;
            }
          }
        }
      }
    }
  };

  const track = (definition) => {
    const onIntersection = (entries) => {
      const entry = entries[0];

      // element has left the viewport, clear definition timer/history/duration
      if (!entry.isIntersecting) {
        definition.history = null;
      } else {
        // check if view threshold has been met
        if (entry.isIntersecting && !timer) {
          timer = setInterval(checkViewability, intervalRate);
          checkViewability();
        }
      }
    };

    if (!definition.observer) {
      const observer = new IntersectionObserver(onIntersection, {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
      });

      observer.observe(element);

      definition.observer = observer;
    }
  };

  afterUpdate(async () => {
    await tick();

    if (element !== null && !ready) {
      createRuleDefinitions();
      ready = true;
    }
  });

  onDestroy(() => {
    definitions.forEach((definition) => {
      if (definition.observer) {
        definition.observer.disconnect();
      }
    });
  });
</script>

<slot />
