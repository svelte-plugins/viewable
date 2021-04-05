[![Unit Tests](https://github.com/svelte-plugins/viewable/actions/workflows/unit.yml/badge.svg)](https://github.com/svelte-plugins/viewable/actions/workflows/unit.yml)
[![Integration Tests](https://github.com/svelte-plugins/viewable/actions/workflows/integration.yml/badge.svg?branch=main)](https://github.com/svelte-plugins/viewable/actions/workflows/integration.yml)
[![codecov](https://codecov.io/gh/svelte-plugins/viewable/branch/main/graph/badge.svg?token=M4JCW0TXOV)](https://codecov.io/gh/svelte-plugins/viewable)

# @svelte-plugins/viewable

A simple rule-based approach to tracking element viewability.

Try it in the [Svelte REPL](https://svelte.dev/repl/47fe04909fd14ee5ad5d02390cc147b1).

## Install

```bash
yarn add -D @svelte-plugins/viewable

# or with NPM

npm i -D @svelte-plugins/viewable
```

## Usage
```svelte
<script>
  import Viewable from "@svelte-plugins/viewable";

  const immediately = (definition) => {
    console.log('element has crossed the viewport');
  };

  const dwell = ({ percentage, duration }) => {
    console.log(`${percentage}% of the element was visible for at least ${duration} consecutive seconds.`);
  };

  const rules = {
    // do something when the element enters the viewport
    immediately: { duration: 0, percentage: 0, fn: immediately },
    // do something when 50% of the element is visible for 4 seconds (consecutively)
    dwell: { duration: 4.5, percentage: 50, fn: dwell },
  };

  let element;
</script>

<Viewable {rules} {element}>
  <div bind:this={element}>Hello World</div>
</Viewable>
```

Try the basic example in [Svelte REPL](https://svelte.dev/repl/c811481b8e1b48e9bed0f6ff7d1fa9c2).

## API

### Props
| Prop name    | Description                                                       | Value                                                                                           |
| :----------- | :---------------------------------------------------------------- | :---------------------------------------------------------------------------------------------- |
| element      | Element to observe                                                | `HTMLElement`                                                                                   |
| [rules](#rules)        | Viewability rules                                                 | `object` (default: `null`)                                                                      |
| intervalRate | Rate to check measurement while intersecting (ms)                 | `number` (default: `200`)                                                                       |
| gridSize     | Size of the obstruction grid                                      | `number` (default: `20`)                                                                        |
| detectObstructions | If `true`, obstructions impacting the element will affect measurement | 'boolean' (default: `false`)                                                          |
| root         | Containing element                                                | `null` or `HTMLElement` (default: `null`)                                                       |
| rootMargin   | Margin offset of the containing element                           | `string` (default: `"0px"`)                                                                     |
| intersecting | `true` if the observed element is intersecting                    | `boolean` (default: `false`)                                                                    |
| observer     | IntersectionObserver instance                                     | [`IntersectionObserver`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver) |
| entry        | Observed element metadata                                         | [`IntersectionObserverEntry`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry) |
| debug        | If `true`, debug ouput will be logged to console                  | `boolean` (default: `false`)                                                                    |

#### rules
| Prop name    | Description                                                         | Value                               |
| :----------- | :------------------------------------------------------------------ | :---------------------------------- |
| duration     | Consecutive time (seconds) that the element must be in view         | `number` (default: `0`)             |
| percentage   | Percentage of the element that must be viewable                     | `number` (default: `0`)             |
| repeat       | If `true`, the rule will be applied indefinitely v once             | `function` (default: `null`)        |
| fn           | Callback function to execute when rule has been met                 | `function` (default: `null`)        |


```js
const rules = {
  dwell: {
    duration: 1,
    percentage: 50,
    fn: () => {
      console.log('50% of the element was visible for at least 1 consecutive second.');
    }
  }
}
```

### Debug props

The properties below can be used to assist with debugging any issues you might have (ex: `bind:duration`, `bind:percent`, etc.)

| Prop name    | Description                                                       | Value                   |
| :----------- | :---------------------------------------------------------------- | :---------------------- |
| duration     | Viewable duration of the tracked element                          | `number` (default: `0`) |
| percent      | Percentage of total viewable area (X+Y)                           | `number` (default: `0`) |
| percentX     | Percentage of horizontal viewable area                            | `number` (default: `0`) |
| percentY     | Percentage of vertical viewable area                              | `number` (default: `0`) |


### Events

- **on:observe**: Fired when an intersection change occurs (type `IntersectionObserverEntry`)
- **on:intersect**: Fired when an intersection change occurs and the element is intersecting (type `IntersectionObserverEntry`)
- **on:complete**: Fired when all rules have been executed

## Changelog

[Changelog](CHANGELOG.md)

## License

[MIT](LICENSE)
