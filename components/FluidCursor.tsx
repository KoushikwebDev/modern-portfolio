'use client';
import useFluidCursor from '@/hooks/useFluidCursor';
import { useEffect } from 'react';

const FluidCursor = () => {
  useEffect(() => {
    useFluidCursor();
  }, []);

  return (
    <div className='fixed inset-0 pointer-events-none z-0'>
      <canvas id='fluid' className='w-full h-full' />
    </div>
  );
};
export default FluidCursor;
