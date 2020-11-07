import React, { useCallback, useEffect, useRef, useState } from 'react';
import globalAxios, { CancelTokenSource } from 'axios';
import { AddFavorite } from 'components/messages';
import { useNotification, useUser } from 'components/providers';
import { axios } from 'utils/axios';

const MESSAGE_ID = 'addFavorite';

interface Payload {
  isFavorite: boolean;
}

interface Return {
  isFavorite: boolean;
  toggleFavorite: () => void;
}

interface Params {
  id: string;
  type: 'event';
  isFavorite: boolean;
}

interface UseFavorites {
  (params: Params): Return;
}

export const useFavorites: UseFavorites = (params) => {
  const isToggled = useRef(false);
  const cancelToken = useRef<CancelTokenSource>();
  const { push, remove } = useNotification();
  const { user } = useUser();
  const [isFavorite, setIsFavorite] = useState<boolean>(params.isFavorite);

  // Sending notification when isFavorite has changed
  useEffect(() => {
    // Do the stuff only after first toggle
    if (!isToggled.current) {
      return;
    }

    if (!isFavorite) {
      remove(MESSAGE_ID);
      return;
    }

    push({
      id: MESSAGE_ID,
      message: <AddFavorite isAuthorised={Boolean(user)} />,
    });
  }, [isFavorite]);

  // Making API call when isFavorite has changed
  useEffect(() => {
    // Do the stuff only after first toggle
    if (!isToggled.current) {
      return;
    }

    (async () => {
      // Cancel previous request
      if (cancelToken.current) {
        cancelToken.current.cancel();
      }

      cancelToken.current = globalAxios.CancelToken.source();

      try {
        const { data } = await axios.post<Payload>(
          '/favorites',
          {
            type: 'event',
            id: params.id,
            action: isFavorite ? 'add' : 'remove',
          },
          {
            cancelToken: cancelToken.current.token,
          }
        );

        setIsFavorite(data.isFavorite);
      } catch (error) {
        // Do nothing if request has been canceled
        if (globalAxios.isCancel(error)) {
          return;
        }

        // TODO Log this case
        console.log('add/remove favorite error', error);
      }
    })();
  }, [isFavorite]);

  const toggleFavorite = useCallback(() => {
    isToggled.current = true;
    setIsFavorite((v) => !v);
  }, []);

  return {
    isFavorite,
    toggleFavorite,
  };
};
