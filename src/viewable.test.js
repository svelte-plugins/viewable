import { render } from '@testing-library/svelte';
import Viewable from './viewable.test.svelte';

describe('Viewable', () => {
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

  it('should render the component', async () => {
    const { container, component } = await TestHarness(DEFAULT_CONFIG);
    expect(component).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});
