/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export type Entry = null | IntersectionObserverEntry;

export interface ViewableProps {
  /**
   * @default null
   */
  element?: null | HTMLElement;

  /**
   * @default null
   */
  rules?: null | Object;

  /**
   * @default false
   */
  debug?: boolean;

  /**
   * @default 0
   */
  duration?: number;

  /**
   * @default 0
   */
  percent?: number;

  /**
   * @default 0
   */
  percentX?: number;

  /**
   * @default 0
   */
  percentY?: number;

  /**
   * @default 200
   */
  intervalRate?: number;

  /**
   * @default 20
   */
  gridSize?: number;

  /**
   * @default false
   */
  detectObstructions?: boolean;

  /**
   * @default null
   */
  root?: null | HTMLElement;

  /**
   * @default '0px'
   */
  rootMargin?: string;

  /**
   * @default [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
   */
  threshold?: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

  /**
   * @default null
   */
  entry?: null | Entry;

  /**
   * @default false
   */
  intersecting?: boolean;

  /**
   * @default null
   */
  observer?: null | IntersectionObserver;
}

export default class Viewable extends SvelteComponentTyped <
  ViewableProps,
  {
    complete: CustomEvent<any>;
    observe: CustomEvent<Entry>;
    intersect: CustomEvent<Entry>;
  },
  {
    default: {
      duration: number,
      entry: Entry,
      intersecting: boolean,
      observer: IntersectionObserver,
      percent: number,
      percentX: number,
      percentY: number
    };
  }
  > {}
