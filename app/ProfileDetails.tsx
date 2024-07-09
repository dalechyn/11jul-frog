'use client';
import { useEffect, useState } from 'react';
import { supabase } from './utils/supabaseClient'; // Adjusted path
import Image from 'next/image';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useRouter } from 'next/navigation';

interface Profile {
  username: string;
  fid: string;
  wallet: string;
  bio: string;
  avatar: string;
  color: string;
  warpcast_url: string;
  lens_url: string;
  rainbow_url: string;
  poap_url: string;
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

interface ProfileDetailsProps {
  id: string;
}

const ProfileDetails = ({ id }: ProfileDetailsProps) => {
  const { isConnected, address } = useAccount(); // Get user account details
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editableProfile, setEditableProfile] = useState<Partial<Profile>>({});
  console.log('profile details');
  useEffect(() => {
    if (id) {
      const fetchProfile = async () => {
        var data = {
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
        setProfile(data);
        setLoading(false);
      };

      fetchProfile();
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;

  if (!profile) return <div>Profile not found</div>;

  return (
    <div>
      <div className={profile.color + ' header'} style={{ width: '100vw', display: 'flex', justifyContent: 'flex-end', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ position: 'absolute', top: '2rem', right: '2rem' }}>
          <ConnectButton label="Sign in" showBalance={false} accountStatus={{ smallScreen: 'avatar' }} />
        </div>
        <Image loader={({ src }) => src} style={{ borderRadius: '50%', border: '10px solid #1A1A1A', width: '8.25rem', height: '8.25rem', marginBottom: '-4rem' }} src={profile.avatar} width="100" height="100" alt={`${profile.username}'s avatar`} />
      </div>
      <div className={profile.color + ' main-content'} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '5rem' }}>
        <h1 style={{ fontSize: '1.25rem', textTransform: 'capitalize' }}>{profile.username}</h1>
        {profile.bio && (
          <p className="bio-container" style={{ textAlign: 'center' }}>
            {profile.bio.replace(/<[^>]*>?/gm, '')}
          </p>
        )}
        <div className={'icon-container'} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '2rem', marginTop: '1.5rem' }}>
          <a target="_blank" href={'https://warpcast.com/' + profile.username} style={{ background: '#202020', border: '1px solid #2D2D2D', fontSize: '20px', textTransform: 'uppercase', padding: '1rem', borderRadius: '8rem', textAlign: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '48px', width: '48px' }}>
            <svg width="25px" height="25px" viewBox="0 0 40 37" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.86391 0H32.6627V36.9231H28.8757V20.0099H28.8386C28.4201 15.3355 24.5167 11.6725 19.7633 11.6725C15.0099 11.6725 11.1066 15.3355 10.688 20.0099H10.6509V36.9231H6.86391V0Z" fill="#D3D3D3" />
              <path d="M0 5.24069L1.53846 10.4814H2.84024V31.6824C2.18665 31.6824 1.6568 32.2156 1.6568 32.8734V34.3027H1.42012C0.766527 34.3027 0.236686 34.836 0.236686 35.4938V36.9231H13.4911V35.4938C13.4911 34.836 12.9613 34.3027 12.3077 34.3027H12.071V32.8734C12.071 32.2156 11.5412 31.6824 10.8876 31.6824H9.46746V5.24069H0Z" fill="#D3D3D3" />
              <path d="M29.1124 31.6824C28.4588 31.6824 27.929 32.2156 27.929 32.8734V34.3027H27.6923C27.0387 34.3027 26.5089 34.836 26.5089 35.4938V36.9231H39.7633V35.4938C39.7633 34.836 39.2335 34.3027 38.5799 34.3027H38.3432V32.8734C38.3432 32.2156 37.8134 31.6824 37.1598 31.6824V10.4814H38.4615L40 5.24069H30.5325V31.6824H29.1124Z" fill="#D3D3D3" />
            </svg>
          </a>
          <a target="_blank" style={{ background: '#202020', border: '1px solid #2D2D2D', fontSize: '20px', textTransform: 'uppercase', padding: '1rem', borderRadius: '8rem', textAlign: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '48px', width: '48px' }} href={profile.lens_url}>
            <Image loader={({ src }) => src} alt="image" src={'/lens.png'} style={{ width: '25px', height: '20px', maxWidth: '25px' }} width="100" height="100" />
          </a>
          <a target="_blank" href={'https://rainbow.me/' + profile.wallet} style={{ background: '#202020', border: '1px solid #2D2D2D', fontSize: '20px', textTransform: 'uppercase', padding: '1rem', borderRadius: '8rem', textAlign: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '48px', width: '48px' }}>
            <Image loader={({ src }) => src} alt="image" src={'/rainbow.png'} style={{ width: '25px', height: '25px', maxWidth: '25px' }} width="100" height="100" />
          </a>
          <a target="_blank" href={'https://collectors.poap.xyz/scan/' + profile.wallet} style={{ background: '#202020', border: '1px solid #2D2D2D', fontSize: '20px', textTransform: 'uppercase', padding: '1rem', borderRadius: '8rem', textAlign: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '48px', width: '48px' }}>
            <Image loader={({ src }) => src} alt="image" src={'/poap.png'} style={{ width: '25px', height: '25px', maxWidth: '25px' }} width="100" height="100" />
          </a>
        </div>
        {[...Array(4)].map((_, i) => (
          <div key={i}>
            {
              profile[`link_${i + 1}_name`] && profile[`link_${i + 1}_url`] && (
                <a className={'button main-links'} href={profile[`link_${i + 1}_url`]}>
                  {profile[`link_${i + 1}_name`]}
                </a>
              )
            }
          </div>
        ))}
        <a href="/" style={{ width: '21px', marginBottom: '1rem', marginTop: '68px' }}>
          <Image loader={({ src }) => src} alt="image" src={'/fan-footer-logo.png'} width="100" height="100" />
        </a>
        <a className="farcaster-logo" href="https://warpcast.com" target="_blank">
          <svg width="12" height="11" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.11834 0H19.5976V22H17.3254V11.9226H17.3032C17.052 9.13742 14.71 6.95484 11.858 6.95484C9.00594 6.95484 6.66394 9.13742 6.41282 11.9226H6.39053V22H4.11834V0Z" fill="#E75F58" />
            <path d="M0 3.12258L0.923077 6.24516H1.70414V18.8774C1.31199 18.8774 0.994083 19.1952 0.994083 19.5871V20.4387H0.852071C0.459916 20.4387 0.142012 20.7564 0.142012 21.1484V22H8.09468V21.1484C8.09468 20.7564 7.77677 20.4387 7.38461 20.4387H7.2426V19.5871C7.2426 19.1952 6.9247 18.8774 6.53254 18.8774H5.68047V3.12258H0Z" fill="#E75F58" />
            <path d="M17.4675 18.8774C17.0753 18.8774 16.7574 19.1952 16.7574 19.5871V20.4387H16.6154C16.2232 20.4387 15.9053 20.7564 15.9053 21.1484V22H23.858V21.1484C23.858 20.7564 23.5401 20.4387 23.1479 20.4387H23.0059V19.5871C23.0059 19.1952 22.688 18.8774 22.2959 18.8774V6.24516H23.0769L24 3.12258H18.3195V18.8774H17.4675Z" fill="#E75F58" />
          </svg>
        </a>
      </div>
    </div>
  );
};
export default ProfileDetails;
