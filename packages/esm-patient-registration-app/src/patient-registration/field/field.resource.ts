import { openmrsFetch, restBaseUrl, showSnackbar, type FetchResponse } from '@openmrs/esm-framework';
import { useState } from 'react';
import useSWRImmutable from 'swr/immutable';
import { type ConceptAnswers, type ConceptResponse } from '../patient-registration.types';

export function useConcept(conceptUuid: string): { data: ConceptResponse; isLoading: boolean } {
  const shouldFetch = typeof conceptUuid === 'string' && conceptUuid !== '';
  const { data, error, isLoading } = useSWRImmutable<FetchResponse<ConceptResponse>, Error>(
    shouldFetch ? `${restBaseUrl}/concept/${conceptUuid}` : null,
    openmrsFetch,
  );
  if (error) {
    showSnackbar({
      title: error.name,
      subtitle: error.message,
      kind: 'error',
    });
  }
  return { data: data?.data, isLoading };
}

export function useConceptAnswers(conceptUuid: string): { data: Array<ConceptAnswers>; isLoading: boolean } {
  const shouldFetch = typeof conceptUuid === 'string' && conceptUuid !== '';
  const { data, error, isLoading } = useSWRImmutable<FetchResponse<ConceptResponse>, Error>(
    shouldFetch ? `${restBaseUrl}/concept/${conceptUuid}` : null,
    openmrsFetch,
  );
  if (error) {
    showSnackbar({
      title: error.name,
      subtitle: error.message,
      kind: 'error',
    });
  }
  return { data: data?.data?.answers, isLoading };
}

type Location = {
  location_id: number;
  description: string;
  parent_location: number;
  location_tag_id: number;
};

type LocationsFetchResponse<T> = {
  data: {
    locations: T[];
  };
};

export function useAddressLocations(locationId: string): {
  data: { uuid: string; label: string }[];
  isLoading: boolean;
} {
  const url = `${restBaseUrl}/custom-location/childLocation?parentLocationIds=${locationId}`;
  const { data, error, isLoading } = useSWRImmutable<LocationsFetchResponse<Location>, Error>(url, openmrsFetch);

  if (error) {
    showSnackbar({
      title: error.name,
      subtitle: error.message,
      kind: 'error',
    });
  }

  return {
    data:
      data?.data?.locations?.map((item) => ({
        uuid: item.description,
        label: item.description,
      })) ?? [],
    isLoading,
  };
}

interface FetchState {
  isLoading: boolean;
  data: {
    main: {
      location_id: number;
      description: string;
      parent_location: number;
      location_tag_id: number;
    }[];
    processed: {
      uuid: string;
      label: string;
    }[];
  };
}

export function useFetchLocations() {
  const [res, setRes] = useState<FetchState>({
    data: { main: [], processed: [] },
    isLoading: true,
  });

  const fetchData = async (locationId: string | number): Promise<void> => {
    const url = `${restBaseUrl}/custom-location/childLocation?parentLocationIds=${locationId}`;
    const abortController = new AbortController();

    setRes((prev) => ({ ...prev, isLoading: true }));

    try {
      const response = await openmrsFetch(url, {
        signal: abortController.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      setRes((prev) => ({
        ...prev,
        data: {
          main: data?.locations ?? [],
          processed: data?.locations?.map((item: any) => ({
            uuid: item.description,
            label: item.description,
          })),
        },
      }));
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.error('Fetch aborted');
      } else {
        showSnackbar({
          title: error.name,
          subtitle: error.message,
          kind: 'error',
        });
      }
    } finally {
      setRes((prev) => ({ ...prev, isLoading: false }));
    }
  };

  return { fetchData, ...res };
}
