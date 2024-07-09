import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { getFrameMetadata } from 'frog/next';
import type { Metadata } from 'next';
import Image from 'next/image';
import styles from './page.module.css';

export async function generateMetadata(props: any): Promise<Metadata> {
  const url = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'
  const frameMetadata = await getFrameMetadata(`${url}/api`)
  return {
    other: frameMetadata,
  }
}

const HomePage: React.FC = () => {
  return (
    <div className="container text-center">
      Hi i'm a homepage.
    </div>
  );
};

export default HomePage;
