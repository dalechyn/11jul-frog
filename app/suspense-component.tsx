'use client';
import { Suspense } from 'react'
import ProfileDetails from './ProfileDetails';

interface SuspendedComponentProps {
  id: string;
}
export function SuspendedComponent({ id }: SuspendedComponentProps) {
  return (
    <Suspense fallback={<>Loading</>}>
      <ProfileDetails id={id} />
    </Suspense>
  )
}
console.log('after suspended');