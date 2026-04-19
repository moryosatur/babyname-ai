/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MeaningTag } from './types';

export const MEANING_TAG_DEFS: MeaningTag[] = [
  { id: 'strong', emoji: '💪', label: 'Strong', colorClass: 'bg-[#D6F0FF]' },
  { id: 'light', emoji: '✨', label: 'Light', colorClass: 'bg-[#FFF4CC]' },
  { id: 'love', emoji: '❤️', label: 'Love', colorClass: 'bg-[#ffa9ba]' },
  { id: 'wise', emoji: '🧠', label: 'Wise', colorClass: 'bg-[#E6E6FA]' },
  { id: 'brave', emoji: '🦁', label: 'Brave', colorClass: 'bg-[#FFE4B5]' },
  { id: 'pure', emoji: '🌸', label: 'Pure', colorClass: 'bg-[#E0FFE0]' },
  { id: 'lucky', emoji: '🍀', label: 'Lucky', colorClass: 'bg-[#D4F1F4]' },
];

export const IMAGES = {
  splash_baby: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtVaIOueQUxWVKCuRQag1U8RcCeSoTGH-HZzddz-VzGIy99eeOHG4F2maVK8ARr481eA62nELt3ECW9Modx00yy6Qx0Q7ve3eKuKJ66_9H9EocaEOzCTanVboM18K5WjNPC82xLfdydYvpEGo32U2vgWwouKxM0td4N9XuL1gyvCtCVcAwZcfRvPxDjcMeJpkoqWmr4-WycddcUa_fGHr5KuS66I5OarN4pJ2RUxWRf1ixrV7luBLpLYMg01RRc1qQsaBlMH5IyMO8',
  home_sleeping_baby: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_L5NGlsMTiWm0ri336ddPwTC2FEiomMYR23YnOJYCwhfZp_KuZMifUCqp8TucKHHKRBXXXM_AFQYLPzSgeAHSLRpuw4bHPDPYZqjmll0Hvj2kkpOCGWEHle4HkZunLMHO96mfWdio6OVIscHhnECS83dlaFUMVTf7LW0d_zg8ITumc89PmrmTXoR89Qg1tnv4zz0iqIN4i7wF_jBrJoUmImfjwhs4ISTEJ9bbdxsTpK_601E8JATqHnq0aA_OghS9tt28BHHvCudP',
  generating_orb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASXj-qO02dO41A4hCDtmplamIY0kIF-zx9ArjAOdBHNPi5pr1yx_1pAon8bmIupn9ZL6YQoRWFS0ZqY2tdbIAGMs4tHe8RuPSwbRaE_XH9cbnnnwWYHhbxPuni_UWbHEa0MyQowf-TcIgYQZRMprKoT7yaHzdYUlZ0F5OixhofWSQwL6gnflbRb_tEnFWj33Luppk8PJVteDcGOtdvc-0ILdwidtLDtJROIJ499rsbKCnV94mhZMcxoT5uBWEbDwNQlxq137DcAnrS',
};

export const INITIAL_FAVORITES = [
  { name: 'Amara', meaning: 'Grace and eternal beauty', origin: 'Arabic' },
  { name: 'Zara', meaning: 'Radiance and blooming flower', origin: 'Persian' },
  { name: 'Layla', meaning: 'Night or dark beauty', origin: 'Hebrew' },
  { name: 'Sofia', meaning: 'Wisdom and intelligence', origin: 'Greek' },
  { name: 'Kenji', meaning: 'Strong and healthy second son', origin: 'Japanese' },
  { name: 'Luca', meaning: 'Bringer of light', origin: 'Latin' },
];
