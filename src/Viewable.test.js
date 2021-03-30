import { render } from '@testing-library/svelte';
import Viewable from './Viewable.svelte';

describe(Viewable.name, () => {
  let TestHarness;
  let content;
  let page;

  const DEFAULT_CONFIG = {
    rules: {
      // do something when this crosses the viewport
      countdown: { duration: 0, percentage: 0, fn: jest.fn(), src: 'https://media1.giphy.com/media/3ohc0Y1TI0vawx60Sc/200.gif' },
      // do something when this is 50% in view for 2 seconds
      rocket: { duration: 2, percentage: 50, fn: jest.fn(), src: 'https://media0.giphy.com/media/dJezVlwfVulTykjRQj/source.gif' },
      // do something when this is 100% in view for 5 seconds
      party: { duration: 5, percentage: 100, fn: jest.fn(), src: 'https://media.giphy.com/media/DhstvI3zZ598Nb1rFf/giphy.gif' }
    }
  };

  beforeEach(() => {
    jest.useFakeTimers();

    content = document.createElement('div');

    page = document.createElement('div');
    page.style.height = `${window.innerHeight * 2}px`;

    content.appendChild(page);

    document.body.appendChild(content);

    TestHarness = () => render(Viewable, { element: content, ...DEFAULT_CONFIG });
  });

  afterEach(() => {
    content.parentNode.removeChild(content);
    jest.restoreAllMocks();
  });

  it('should render the component', () => {
    const { component } = TestHarness();
    expect(component).toBeTruthy();
  });
});
