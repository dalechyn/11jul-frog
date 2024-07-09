import { headers } from 'next/headers'
import type { Metadata } from 'next'
import { getFrameMetadata, isFrameRequest } from 'frog/next'
import { SuspendedComponent } from '../../suspense-component';

export async function generateMetadata(props: any): Promise<Metadata> {
  const url = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'
  const frameMetadata = await getFrameMetadata(`${url}/api?username=${props.params.id}`);
  console.log('meta', frameMetadata);
  return {
    other: frameMetadata,
  }
}
export default function Page(props: any) {
  const { id } = props.params;
  if (isFrameRequest(headers()) || id) return null
  console.log('we failed being a frame');
  return <SuspendedComponent id={id.toString()} />
}