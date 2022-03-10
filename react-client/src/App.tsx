import React from 'react';
import { useQuery } from 'react-query'
import {
  Container,
  List,
  ListItem,
  Text,
} from '@chakra-ui/react'
import { gql, request } from 'graphql-request'

const endpoint = 'http://localhost:4000';

type TUser = {
  id: string;
  name: string;
}

function useUsers() {
  return useQuery<TUser[], Error>("users", async () => {
    const { users } = await request(
      endpoint,
      gql`
        query {
          users {  
            id
            name
          }
        }
      `
    );
    return users;
  });
}

function App() {
  const { status, data, error } = useUsers();

  switch (status) {
    case 'loading': {
      return (
        <Text>Loading...</Text>
      );
    }
    case 'error': {
      return (
        <Text>{error?.message}</Text>
      );
    }
    case 'idle': {
      return (
        <Text>Initializing...</Text>
      );
    }
    default: {
      return (
        <Container centerContent>
          <Text>List of Users</Text>
          <List>
            {data?.map((user: TUser) => <ListItem key={user.id}>{user.name}</ListItem>)}
          </List>
        </Container>
      )
    }
  }
};

export default App;
