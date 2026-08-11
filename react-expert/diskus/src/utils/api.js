const BASE_URL = '/api';

function getAccessToken() {
  return localStorage.getItem('accessToken');
}

function putAccessToken(token) {
  localStorage.setItem('accessToken', token);
}

const api = {
  async register({name, email, password}) {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, email, password}),
    });

    const responseJson = await response.json();
    const {status, message} = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return responseJson.data.user;
  },

  async login({email, password}) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password}),
    });

    const responseJson = await response.json();
    const {status, message} = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return responseJson.data.token;
  },

  async getOwnProfile() {
    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    const responseJson = await response.json();
    const {status, message} = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return responseJson.data.user;
  },

  async getAllUsers() {
    const response = await fetch(`${BASE_URL}/users`);
    const responseJson = await response.json();
    const {status, message} = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return responseJson.data.users;
  },

  async getAllThreads() {
    const response = await fetch(`${BASE_URL}/threads`);
    const responseJson = await response.json();
    const {status, message} = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return responseJson.data.threads;
  },

  async getThreadDetail(id) {
    const response = await fetch(`${BASE_URL}/threads/${id}`);
    const responseJson = await response.json();
    const {status, message} = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return responseJson.data.detailThread;
  },

  async createThread({title, body, category}) {
    const response = await fetch(`${BASE_URL}/threads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAccessToken()}`,
      },
      body: JSON.stringify({title, body, category}),
    });

    const responseJson = await response.json();
    const {status, message} = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return responseJson.data.thread;
  },

  async createComment(threadId, content) {
    const response = await fetch(`${BASE_URL}/threads/${threadId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAccessToken()}`,
      },
      body: JSON.stringify({content}),
    });

    const responseJson = await response.json();
    const {status, message} = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return responseJson.data.comment;
  },

  async toggleVote(threadId, voteType) {
    let endpoint = 'neutral-vote';
    if (voteType === 1) endpoint = 'up-vote';
    if (voteType === -1) endpoint = 'down-vote';

    const response = await fetch(`${BASE_URL}/threads/${threadId}/${endpoint}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    const responseJson = await response.json();
    const {status, message} = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return responseJson.data.vote;
  },

  async toggleVoteComment(threadId, commentId, voteType) {
    let endpoint = 'neutral-vote';
    if (voteType === 1) endpoint = 'up-vote';
    if (voteType === -1) endpoint = 'down-vote';

    const response = await fetch(`${BASE_URL}/threads/${threadId}/comments/${commentId}/${endpoint}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    const responseJson = await response.json();
    const {status, message} = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return responseJson.data.vote;
  },

  async getLeaderboards() {
    const response = await fetch(`${BASE_URL}/leaderboards`);
    const responseJson = await response.json();
    const {status, message} = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return responseJson.data.leaderboards;
  },

  putAccessToken,
  getAccessToken,
};

export default api;
