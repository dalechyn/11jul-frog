/** @jsxImportSource frog/jsx */
import axios from 'axios';
import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
import { serveStatic } from 'frog/serve-static'
import { neynar, type NeynarVariables } from 'frog/middlewares'
import { createSystem } from 'frog/ui'
import { handle } from 'frog/next'
import * as dotenv from 'dotenv';

dotenv.config();

const mainDBTable = 'table-name';
export type FrameIntent = JSX.Element | JSX.Element[] | false | null | undefined

interface Fan {
  id: number;
  fid: number;
  username: string;
  wallet: string;
  bio: string;
  avatar: string;
  color: 'red' | 'yellow' | 'green' | 'blue' | 'purple' | 'black';
  link_1_name?: string;
  link_1_url?: string;
  link_2_name?: string;
  link_2_url?: string;
  link_3_name?: string;
  link_3_url?: string;
  link_4_name?: string;
  link_4_url?: string;
  [key: string]: any;
}
const { vars } = createSystem({
  colors: {
    text: '#000000',
    background: '#ffffff',
    blue: '#0070f3',
    green: '#00ff00',
    red: '#ff0000',
    orange: '#ffaa00',
  },
  fonts: {
    default: [
      {
        name: 'Inter',
        source: 'google',
        weight: 300,
      },
      {
        name: 'Inter',
        source: 'google',
        weight: 600,
      },
    ],
  },
});



const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  // browserLocation: '/create',
  title: 'Fan.io | FanPage',
  imageOptions: {
    fonts: [
      {
        name: 'Inter',
        source: 'google',
        weight: 300,
      },
      {
        name: 'Inter',
        source: 'google',
        weight: 600,
      },
    ],
  },
  //hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
}).use(
    neynar({
      apiKey: process.env.NEXT_PUBLIC_NEYNAR_API || 'NEYNAR_FROG_FM',
      features: ['interactor', 'cast'],
    }),
  )

app.frame('/', async (c) => {
  const { buttonValue, inputText, status } = c;
  const username = c.req.query('username') || false;
  const activeLink = 1;
  let existingFan: Fan | false = false;
  app.imageAspectRatio = '1.91:1';
  let intents: any = [];
  try {
    if (username) {
      // @ts-expect-error
      existingFan = await getFanByUsername(username);
    }
  } catch (error) {
    console.error('Error fetching fan:', error);
  }
  console.log(existingFan);

  let imageElements = (
    <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#1A1A1A', flex: '1', alignItems: 'center', justifyContent: 'space-between', height: '100vh' }}>
      <div style={{ display: 'flex', flexDirection: 'column', fontFamily: 'font-["Inter"]', color: 'white', padding: '4rem', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem', marginBottom: '4rem' }}>
          <img src={process.env.NEXT_PUBLIC_URL + '/fan-frame-logo.png'} style={{ width: '150px', height: '150px' }} />
          <span style={{ borderRadius: '8rem', padding: '1rem 1.25rem', backgroundColor: '#454545', fontSize: '30', fontFamily: 'font-["Inter"]' }}>fan.io/yourname</span>
        </div>
        <span style={{ color: '#fff', fontSize: 56, marginBottom: '1rem', fontWeight: 'bold' }}>
          Deploy Your FAN Page
        </span>
        <span style={{ color: '#fff', fontSize: 42, marginBottom: '1rem', fontWeight: '300' }}>
          Create a hub for your web3 identity directly in this frame. Share your links and showcase your projects on your personalized website. Get started now! ⬇️
        </span>
      </div>
    </div>
  ) as any;

  if (existingFan) {
    app.imageAspectRatio = '1:1';
    imageElements = '/existing-image/' + existingFan.id.toString();
    intents.push(<Button value={existingFan.id.toString()} action="/existing/4">⬆️</Button>);
    intents.push(<Button value={existingFan.id.toString()} action="/existing/2">⬇️</Button>);
    intents.push(
      <Button.Link href={String(existingFan[`link_${activeLink}_url` as keyof Fan] || '')}>
        {String(existingFan[`link_${activeLink}_name` as keyof Fan] || '')}
      </Button.Link>
    );
    intents.push(
      <Button.Link href={'https://faniosite.framesframes.xyz/profile/' + existingFan.username}>Fan Page</Button.Link>
    );
  } else {
    intents.push(<Button action="/start">Get Started</Button>);
  }
  return c.res({
    image: imageElements,
    intents: intents,
  });
});

app.image('/existing-image/:id', async (c) => {
  const id = extractLastValue(c.req.path);
  // @ts-expect-error
  let existingFan: Fan | false = await getFanByUsername(id); // sending to simplified route that just returns our value
  let bio;
  var fanColor: string = '#E75F58';
  if(existingFan){
    app.imageAspectRatio = '1:1';
    bio = existingFan.bio ? existingFan.bio.replace(/<[^>]*>?/gm, '') : '';
  }
  return c.res({
    headers: {
      'Cache-Control': 'max-age=0'
    },
    image: (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', fontFamily: 'font-["Inter"]', color: 'white', backgroundColor: '#1A1A1A' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', width: '100vw' }}>
          {fanColor && existingFan && (
            <div style={{ backgroundColor: fanColor, height: '6rem', width: '100%', display: 'flex', justifyContent: 'flex-end', flexDirection: 'column', alignItems: 'center' }}>
              {existingFan.username && existingFan.avatar && (
                <img style={{ borderRadius: '50%', border: '10px solid #1A1A1A', width: '7.25rem', height: '7.25rem', marginBottom: '-4rem' }} src={existingFan.avatar} alt={`${existingFan.username}'s avatar`} />
              )}
            </div>
          )}
          {existingFan && (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '5rem' }}>
              <h1 style={{ fontSize: 26, padding: 0, margin: 0, textTransform: 'capitalize' }}>{existingFan.username}</h1>
              {bio && (
                <p style={{ padding: '1rem 2rem', paddingTop: '0', fontSize: 16, textAlign: 'center', marginBottom: '2rem', width: '50vw' }}>
                  {truncateText(bio, 155)}
                </p>
              )}
            </div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {existingFan && existingFan.link_1_name && existingFan.link_1_url && (
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', border: `4px solid ${fanColor}`, textTransform: 'uppercase', backgroundColor: '#1D1D1D', fontSize: 20, width: '35vw', padding: '0.75rem 1rem', fontWeight: '300', marginBottom: '1rem', borderRadius: '8rem' }}>
                {truncateText(existingFan.link_1_name, 12)}
              </div>
            )}
            {existingFan && existingFan.link_2_name && existingFan.link_2_url && (
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', border: '2px solid #2D2D2D', textTransform: 'uppercase', backgroundColor: '#1D1D1D', fontSize: 20, width: '35vw', padding: '0.75rem 1rem', fontWeight: '300', marginBottom: '1rem', borderRadius: '8rem' }}>
                {truncateText(existingFan.link_2_name, 12)}
              </div>
            )}
            {existingFan && existingFan.link_3_name && existingFan.link_3_url && (
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', border: '2px solid #2D2D2D', textTransform: 'uppercase', backgroundColor: '#1D1D1D', fontSize: 20, width: '35vw', padding: '0.75rem 1rem', fontWeight: '300', marginBottom: '1rem', borderRadius: '8rem' }}>
                {truncateText(existingFan.link_3_name, 12)}
              </div>
            )}
            {existingFan && existingFan.link_4_name && existingFan.link_4_url && (
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', border: '2px solid #2D2D2D', textTransform: 'uppercase', backgroundColor: '#1D1D1D', fontSize: 20, width: '35vw', padding: '0.75rem 1rem', fontWeight: '300', marginBottom: '1rem', borderRadius: '8rem' }}>
                {truncateText(existingFan.link_4_name, 12)}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  })
});

function extractLastValue(url: string) {
  const parts = url.split('/');
  const fid = parts[parts.length - 1];
  return fid;
}

function truncateText(text: string | undefined, length: number = 20) {
  if (!text) return '';
  return text.length > length ? text.substring(0, length) + '...' : text;
}

// Helper function to get fan record by Username
async function getFanByUsername(username:string) {
  return {
    id: 19,
    created_at: '2024-06-29T07:20:17.54642+00:00',
    fid: 268290,
    wallet: '0x0c9e725902f2eeec063c16d253f38684e3192001',
    username: 'breadcat',
    avatar: 'https://i.imgur.com/sh6qyut.jpg',
    color: 'purple',
    link_1_name: 'test',
    link_1_url: 'test.com',
    link_2_name: 'test 2',
    link_2_url: 'test2.com',
    link_3_name: 'test 3',
    link_3_url: 'test3.com',
    link_4_name: 'test 4',
    link_4_url: 'https://warpcast.com',
    warpcast_url: null,
    lens_url: null,
    rainbow_url: null,
    poap_url: null,
    bio: '• Neighborhood friendly Breadcat \n' +
      '• Dad 1st • Dev 2nd \n' +
      '• I want to bring dreams to reality\n' +
      ' • How can I help you? • Maker of /feesh \n' +
      '• Hypersub:  /mega-big-town'
  };
}

export const GET = handle(app)
export const POST = handle(app)
devtools(app, { serveStatic })
