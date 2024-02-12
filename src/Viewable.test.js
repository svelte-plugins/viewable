import { render } from '@testing-library/svelte';
import Viewable from './Viewable.test.svelte';

vi.useFakeTimers();

describe('Viewable', () => {
  let onIntersectionMock;

  const DEFAULT_CONFIG = {
    rules: {
      immediate: {
        duration: 0,
        percentage: 0,
        fn: vi.fn()
      }
    }
  };

  const TestHarness = (props) => render(Viewable, props);

  beforeEach(() => {
    global.IntersectionObserver = class IntersectionObserver {
      constructor(onIntersection) {
        onIntersectionMock = vi.fn(onIntersection);
      }
      disconnect() {}
      observe() {}
      unobserve() {}
    };

    document.elementFromPoint = vi.fn();

    DEFAULT_CONFIG.rules.immediate.fn = vi.fn();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it('should render the component', async () => {
    const { container, component } = await TestHarness(DEFAULT_CONFIG);
    expect(component).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  it('should reset history when not intersecting', async () => {
    await TestHarness(DEFAULT_CONFIG);

    onIntersectionMock([{ isIntersecting: false }]);

    expect(DEFAULT_CONFIG.rules.immediate.fn).not.toHaveBeenCalled();
  });

  it('should execute rules when duration and percentage have been meet (immediate)', async () => {
    const mock = vi.fn();

    await TestHarness({ debug: true, detectObstructions: true, rules: { immediate: { fn: mock } } });

    onIntersectionMock([{ isIntersecting: true }]);

    vi.runAllTimers();

    expect(mock).toHaveBeenCalled();
  });

  it('should execute rules when duration and percentage have been meet (delayed)', async () => {
    const mockDateNow = vi.fn();

    global.Date.now = mockDateNow;

    const fn = vi.fn();

    const { container } = await TestHarness({
      detectObstructions: true,
      rules: {
        fifty4six: {
          percentage: 50,
          duration: 6,
          fn
        }
      }
    });

    const element = container.firstChild.firstChild;

    element.getBoundingClientRect = vi.fn(() => ({
      width: 100,
      height: 100,
      top: 0,
      left: 100,
      bottom: 100,
      right: 200
    }));

    document.elementFromPoint = vi.fn().mockReturnValue(element);

    mockDateNow.mockReturnValueOnce(1617133864079);

    onIntersectionMock([{ isIntersecting: true }]);

    expect(fn).not.toHaveBeenCalled();

    mockDateNow.mockReturnValue(1617133870891);

    vi.advanceTimersByTime(6000);

    expect(fn).toHaveBeenCalled();
  });
});
