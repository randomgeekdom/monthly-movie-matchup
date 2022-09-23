<template>
  <div class="home">
    <h1>Monthly Movie Matchup</h1>
    <h6>Remaining: {{ RemainingPicpoints() }}pp</h6>
  </div>
  <div class="row">
    <div class="col" v-for="movie in movies" v-bind:key="movie.title">
      <button class="btn" @click="SelectMovie(movie)">
        <div class="card">
          {{ movie.title }}
          <img class="card-img-top" :src="movie.image" :alt="movie.title" />
          <div class="card-footer">{{ movie.cost }}pp</div>
        </div>
      </button>
    </div>
  </div>

  <h6>Your list:</h6>
  <div v-if="selections.length == 0">
    <p>None selected yet.</p>
  </div>
  <div v-else>
    <p>{{ selections.length }} / 9</p>
    <div class="row" v-for="movie in Selections()" v-bind:key="movie.id">
      <button
        class="btn btn-sm btn-outline-primary"
        @click="RemoveSelection(movie)"
      >
        {{ movie.title }} : {{ movie.cost }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  data: function () {
    var selections: {
      id: number;
      title: string;
      image: string;
      cost: number;
    }[] = [];
    return {
      selections: selections,
      movies: [
        {
          title: "Don't Worry Darling",
          image:
            "https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Don%27t_Worry_Darling_Poster_2.jpg/220px-Don%27t_Worry_Darling_Poster_2.jpg",
          cost: 194,
        },
        {
          title: "The Woman King",
          image:
            "https://upload.wikimedia.org/wikipedia/en/3/34/The_Woman_King_%28film%29.jpg",
          cost: 104,
        },
        {
          title: "Avatar (2022 Re-Issue)",
          image:
            "https://upload.wikimedia.org/wikipedia/en/thumb/d/d6/Avatar_%282009_film%29_poster.jpg/220px-Avatar_%282009_film%29_poster.jpg",
          cost: 75,
        },
        {
          title: "Barbarian",
          image:
            "https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Barbarian_2022_film_poster.png/220px-Barbarian_2022_film_poster.png",
          cost: 41,
        },
        {
          title: "Bullet Train",
          image:
            "https://upload.wikimedia.org/wikipedia/en/thumb/1/13/Bullet_Train_%28poster%29.jpeg/220px-Bullet_Train_%28poster%29.jpeg",
          cost: 17,
        },
        {
          title: "See How They Run",
          image:
            "https://upload.wikimedia.org/wikipedia/en/thumb/7/72/See_How_They_Run_%282022_film%29.jpg/220px-See_How_They_Run_%282022_film%29.jpg",
          cost: 16,
        },
        {
          title: "DC League of Super-Pets",
          image:
            "https://upload.wikimedia.org/wikipedia/en/thumb/0/09/DC_League_of_Super-Pets.jpg/220px-DC_League_of_Super-Pets.jpg",
          cost: 89,
        },
        {
          title: "Top Gun: Maverick",
          image:
            "https://upload.wikimedia.org/wikipedia/en/thumb/1/13/Top_Gun_Maverick_Poster.jpg/220px-Top_Gun_Maverick_Poster.jpg",
          cost: 14,
        },
        {
          title: "Pearl",
          image:
            "https://upload.wikimedia.org/wikipedia/en/5/5b/Pearl_theatricalposter.jpg",
          cost: 13,
        },
        {
          title: "Minions: The Rise of Gru",
          image:
            "https://upload.wikimedia.org/wikipedia/en/thumb/4/45/Minions_The_Rise_of_Gru_poster.jpg/220px-Minions_The_Rise_of_Gru_poster.jpg",
          cost: 9,
        },
      ],
    };
  },
  methods: {
    SelectMovie(movie: { title: string; image: string; cost: number }) {
      if (
        movie.cost > this.RemainingPicpoints() ||
        this.selections.length >= 9
      ) {
        return;
      }

      var id =
        this.selections.length == 0
          ? 1
          : Math.max.apply(
              Math,
              this.selections.map((x) => x.id)
            ) + 1;

      this.selections.push({
        title: movie.title,
        cost: movie.cost,
        image: movie.image,
        id: id,
      });
    },

    RemoveSelection(selection: { id: number }) {
      var removedSelection = this.selections.find((x) => x.id == selection.id);

      if (!removedSelection) {
        return;
      }

      this.selections.splice(this.selections.indexOf(removedSelection), 1);
    },

    Selections() {
      return this.selections.sort((a, b) => (a.cost > b.cost ? -1 : 1));
    },

    RemainingPicpoints() {
      return (
        500 -
        this.selections.reduce((accumulator, obj) => accumulator + obj.cost, 0)
      );
    },
  },
});
</script>
