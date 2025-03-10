import { Box, Image } from '@chakra-ui/react';
import Button from '@/src/components/Button';

export default function OnboardingPage() {
  return (
    <Box bg={'white'} height={'100vh'} width={'100vw'}>
      <Image src="code-your-dreams-logo.svg" alt="Code Your Dreams" width={'283px'} />
    </Box>
  );
}
