import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

ReactDOM.render((
    <QueryClientProvider client={queryClient}>
        <ChakraProvider>
            <App />
        </ChakraProvider>
    </QueryClientProvider>
), document.getElementById('root'));
