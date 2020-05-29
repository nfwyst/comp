import { useState, useEffect } from 'react';

function useDebounce(value: any, delay = 300) {
  const [val, setValue] = useState(value)
  useEffect(() => {
    const handler = window.setTimeout(() => {
      setValue(value)
    }, delay)
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])
  return val
}

export default useDebounce
