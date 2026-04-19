/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Gender = 'boy' | 'girl' | 'unisex';

export type Origin = 'indonesian' | 'japanese' | 'arabic' | 'western' | 'mix';

export type Vibe = 'modern' | 'classic' | 'unique' | 'meaningful';

export interface MeaningTag {
  id: string;
  emoji: string;
  label: string;
  colorClass: string;
}

export interface BabyName {
  name: string;
  meaning: string;
  origin: string;
  isFavorite?: boolean;
}

export type Screen = 
  | 'splash' 
  | 'home' 
  | 'onboarding-gender' 
  | 'onboarding-origin' 
  | 'onboarding-style' 
  | 'onboarding-meaning' 
  | 'generating' 
  | 'results' 
  | 'saved' 
  | 'upgrade';

export interface UserPreferences {
  gender: Gender | null;
  origin: Origin | null;
  vibe: Vibe | null;
  meanings: string[];
}
