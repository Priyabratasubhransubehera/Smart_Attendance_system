import { RouterProvider } from 'react-router';
import { Toaster } from './components/ui/sonner';
import { router } from './routes';

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: {
            background: '#1a1d21',
            color: '#fff',
            border: '1px solid #374151',
          },
        }}
      />
    </>
  );
}
