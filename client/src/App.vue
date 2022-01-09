<script setup>
import { ref } from 'vue';
import socket from './socket/socket';
import Board from './components/Board.vue';

const name = ref('');
const loggedIn = ref(false);
const positions = ref([]);

socket.on('connect', () => {
  console.log('Connected');
});

socket.on('update-character-positions', (message) => {
  positions.value = [...message];
});

async function move(direction) {
  socket.emit('move', { direction });
}

async function connect() {
  try {
    const res = await fetch('http://localhost:3001/characters/login', {
      method: 'POST',
      body: JSON.stringify({
        name: name.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();

    socket.auth = { token: data.token };

    socket.connect();

    loggedIn.value = true;

    window.addEventListener('keydown', (e) => {
      if (e.key === 'w') move(0);
      if (e.key === 'd') move(1);
      if (e.key === 's') move(2);
      if (e.key === 'a') move(3);
    });
  } catch {
    loggedIn.value = false;
  }
}
</script>

<template>
  <input
    v-model="name"
    :disabled="loggedIn"
    class="border-2"
  >
  <button
    :disabled="loggedIn"
    @click="connect"
  >
    Connect
  </button>

  <button
    class="mx-2"
    @click="move(0)"
  >
    UP
  </button>
  <button
    class="mx-2"
    @click="move(1)"
  >
    RIGHT
  </button>
  <button
    class="mx-2"
    @click="move(2)"
  >
    DOWN
  </button>
  <button
    class="mx-2"
    @click="move(3)"
  >
    LEFT
  </button>

  <p>
    {{ positions }}
  </p>

  <div>
    <Board :positions="positions" />
  </div>
</template>
