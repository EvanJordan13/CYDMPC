'use client';

import { Box } from '@chakra-ui/react';
import LandingPage from './landing/page';
import { useUser } from '@auth0/nextjs-auth0/client';
import AuthRedirect from '../components/AuthRedirect';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      // Check if the user has completed onboarding
      fetch(`/api/users/lookup?email=${encodeURIComponent(user.email!)}`)
        .then(res => res.json())
        .then(data => {
          if (data.signupComplete) {
            router.push('/dashboard');
          } else {
            router.push('/onboarding');
          }
        })
        .catch(err => {
          console.error('Error checking user status:', err);
          // Default to onboarding if there's an error
          router.push('/onboarding');
        });
    }
  }, [user, isLoading, router]);

  return <LandingPage />;
}
