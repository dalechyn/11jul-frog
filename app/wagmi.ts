'use client'
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  base
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'mininimum demo',
  projectId: 'YOUR_PROJECT_ID',
  chains: [
    base
  ],
  ssr: true,
});