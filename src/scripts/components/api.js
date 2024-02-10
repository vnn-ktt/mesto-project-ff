export const server_CONFIG = {
  base_URL: 'https://mesto.nomoreparties.co/v1/wff-cohort-5',
  headers: {
    authorization: 'e918f767-bd1e-42f7-810a-91d0bd90b520',
    'Content-Type': 'application/json',
  },
};

async function handleResponse(response) {
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    return Promise.reject(`Ошибка запроса к серверу: ${response.status}`);
  }
}

export const requestGetUser = async () => {
  const response = await fetch(`${server_CONFIG.base_URL}/users/me`, {
    method: 'GET',
    headers: server_CONFIG.headers,
  });
  return handleResponse(response);
};

export const requestGetCards = async () => {
  const response = await fetch(`${server_CONFIG.base_URL}/cards`, {
    method: 'GET',
    headers: server_CONFIG.headers,
  });
  return handleResponse(response);
};

export const requestUpdateUser = async (user) => {
  const response = await fetch(`${server_CONFIG.base_URL}/users/me`, {
    method: 'PATCH',
    headers: server_CONFIG.headers,
    body: JSON.stringify({
      name: user.name,
      about: user.about,
    }),
  });
  return handleResponse(response);
};

export const requestUpdateAvatar = async (url) => {
  const response = await fetch(`${server_CONFIG.base_URL}/users/me/avatar`, {
    method: 'PATCH',
    headers: server_CONFIG.headers,
    body: JSON.stringify({
      avatar: url,
    }),
  });
  return handleResponse(response);
};

export const requestCreateCard = async (card) => {
  const response = await fetch(`${server_CONFIG.base_URL}/cards`, {
    method: 'POST',
    headers: server_CONFIG.headers,
    body: JSON.stringify({
      name: card.name,
      link: card.link,
    }),
  });
  return handleResponse(response);
};

export const requestDeleteCard = async (cardId) => {
  const response = await fetch(`${server_CONFIG.base_URL}/cards/${cardId}`, {
    method: 'DELETE',
    headers: server_CONFIG.headers,
  });
  return handleResponse(response);
};

export const requestLikeCard = async (cardId) => {
  const response = await fetch(
    `${server_CONFIG.base_URL}/cards/likes/${cardId}`,
    {
      method: 'PUT',
      headers: server_CONFIG.headers,
    },
  );
  return handleResponse(response);
};

export const requestDislikeCard = async (cardId) => {
  const response = await fetch(
    `${server_CONFIG.base_URL}/cards/likes/${cardId}`,
    {
      method: 'DELETE',
      headers: server_CONFIG.headers,
    },
  );
  return handleResponse(response);
};
