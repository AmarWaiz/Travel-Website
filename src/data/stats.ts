export interface Stat {
  value: number;
  suffix: string;
  decimals?: number;
  label: string;
}

/**
 * PLACEHOLDER: replace with real data — every stat below is a sample figure
 * written for layout purposes.
 */
export const stats: Stat[] = [
  { value: 12, suffix: "+", label: "Years of experience" },
  { value: 4800, suffix: "+", label: "Happy travellers" },
  { value: 26, suffix: "", label: "Destinations worldwide" },
  { value: 4.9, suffix: "", decimals: 1, label: "Average tour rating" },
];
