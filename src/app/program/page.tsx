'use client';

import Module from '@/src/components/Module';
import { Sidebar } from 'lucide-react';
import { Text, Heading, Box, Image, Tabs, Flex } from '@chakra-ui/react';
import AnnouncementCard from '@/src/components/AnnouncementCard';
import { getProgramAnnouncements, getUniqueProgram, getUniqueUser } from '@/src/lib/query/programs';
import { Announcement, Program, User } from '@prisma/client';
import { useState } from 'react';
import prisma from '@/src/lib/postgres/db';

export default function ProgramPage() {
  const programId = 1;
  const [isLoadingAnnouncements, setIsLoadingAnnouncements] = useState(false);
  const [programAnnouncements, setProgramAnnouncements] = useState<Announcement[]>([]);

  const [program, setProgram] = useState<Program>();
  const [user, setUser] = useState<User>();

  const fetchProgramAnnouncements = async () => {
    setIsLoadingAnnouncements(true);
    try {
      const program = await getUniqueProgram(programId);
      const announcements = await getProgramAnnouncements(programId);
      const user = await getUniqueUser(program.teacherId);
      console.log('Program Announcements', announcements);
      setProgramAnnouncements(announcements);
      setProgram(program);
      setUser(user);
    } catch (error) {
      console.error('Error fetching program announcements:', error);
    } finally {
      setIsLoadingAnnouncements(false);
    }
  };

  return (
    <Box display={'flex'} backgroundColor={'white'} color={'black'}>
      
      <Box marginY={6} style={{ flexBasis: '85%' }}>
        <Box display={'flex'} height={'28px'} justifyContent={'space-between'}>
          <Heading fontSize={35} fontWeight={'bold'} color={'Aqua'}>
            HTML Basics
          </Heading>
          <Box display={'flex'} alignItems={'center'} gap={2}>
            <Image width={'19px'} height={'28px'} src={'/streak-card-icon.svg'} />
            <Text color={'#FFCE29'} fontWeight={'bold'} fontSize={30} marginRight={10}>
              5
            </Text>
          </Box>
        </Box>
        <Box marginTop={5} width={'96.5%'}>
          <Tabs.Root defaultValue="modules">
            <Tabs.List>
              <Tabs.Trigger
                value="modules"
                _selected={{
                  color: 'Aqua',
                  fontWeight: '700',
                  borderBottom: '4px solid #4D80BB',
                }}
              >
                <Text>Modules</Text>
              </Tabs.Trigger>
              <Tabs.Trigger
                value="announcements"
                _selected={{
                  color: 'Aqua',
                  fontWeight: '700',
                  borderBottom: '4px solid #4D80BB',
                }}
                onClick={fetchProgramAnnouncements}
              >
                <Text>Announcements</Text>
              </Tabs.Trigger>
              <Tabs.Trigger
                value="feedback"
                _selected={{
                  color: 'Aqua',
                  fontWeight: '700',
                  borderBottom: '4px solid #4D80BB',
                }}
              >
                <Text>Feedback</Text>
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="modules">
              <Module />
              <Module />
            </Tabs.Content>

            <Tabs.Content value="announcements">
              <Flex direction="column" paddingTop={'16px'} paddingBottom={'16px'} gap={'32px'}>
                {!isLoadingAnnouncements &&
                  programAnnouncements.map(a => (
                    <AnnouncementCard
                      subject={program ? program.name : ''}
                      title={a.title}
                      message={a.content}
                      name={user.name}
                      avatarUrl={user.avatarUrl}
                      createdAt={a.createdAt}
                      link="/"
                    />
                  ))}
              </Flex>
            </Tabs.Content>
          </Tabs.Root>
        </Box>
      </Box>
    </Box>
  );
}
