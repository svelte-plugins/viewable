import { render } from '@testing-library/svelte';
import Viewable from './Viewable.test.svelte';

jest.useFakeTimers();

describe(Viewable.name, () => {
  let onIntersectionMock;

  const DEFAULT_CONFIG = {
    rules: {
      immediate: {
        duration: 0,
        percentage: 0,
        fn: jest.fn()
      }
    }
  };

  const TestHarness = (props) => render(Viewable, props);

  beforeEach(() => {
    global.IntersectionObserver = class IntersectionObserver {
      constructor(onIntersection) {
        onIntersectionMock = jest.fn(onIntersection);
      }
      disconnect() {}
      observe() {}
      unobserve() {}
    };

    document.elementFromPoint = jest.fn();

    DEFAULT_CONFIG.rules.immediate.fn = jest.fn();
    // document.elementFromPoint = jest.fn().mockImplementation(() => container.firstChild.firstChild);
  });

  it('should render the component', async () => {
    const { container, component } = await TestHarness(DEFAULT_CONFIG);
    expect(component).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  it('should execute the "immediate" viewability rule', async () => {
    await TestHarness({ debug: true, ...DEFAULT_CONFIG });

    onIntersectionMock([{ isIntersecting: true }]);

    jest.runAllTimers();

    expect(DEFAULT_CONFIG.rules.immediate.fn).toHaveBeenCalled();
    expect(document.elementFromPoint).toHaveBeenCalled();
  });

  it('should reset history when not intersecting', async () => {
    await TestHarness(DEFAULT_CONFIG);

    onIntersectionMock([{ isIntersecting: false }]);

    expect(DEFAULT_CONFIG.rules.immediate.fn).not.toHaveBeenCalled();
  });
});
