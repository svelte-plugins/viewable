import type { SvelteComponent } from 'svelte';

type Entry = IntersectionObserverEntry | null;

interface RuleDefinition {
  duration: number;
  percentage: number;
  fn: (definition: any) => void;
}

export interface ViewableProps {
  element: HTMLElement | null;
  rules: Record<string, RuleDefinition> | null;
  debug?: boolean;
  duration?: number;
  percent?: number;
  percentX?: number;
  percentY?: number;
  intervalRate?: number;
  gridSize?: number;
  detectObstructions?: boolean;
  root?: HTMLElement | null;
  rootMargin?: string;
  threshold?: number[];
  entry?: Entry | null;
  intersecting?: boolean;
  observer?: IntersectionObserver | null;
}

export interface ViewableEvents {
  complete: CustomEvent<any>;
  observe: CustomEvent<Entry>;
  intersect: CustomEvent<Entry>;
}

export interface ViewableSlots {
  default?: {
    duration: number;
    entry: Entry;
    intersecting: boolean;
    observer: IntersectionObserver;
    percent: number;
    percentX: number;
    percentY: number;
  };
}
