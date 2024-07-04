import { useEffect } from 'react';

const useLocationFetch = (locationId: string, fetchFunc: (id: string) => void, dependencies: any[]) => {
  useEffect(() => {
    if (locationId) {
      fetchFunc(locationId);
    }
  }, dependencies);
};
export default useLocationFetch;
