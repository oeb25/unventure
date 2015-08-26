import * as dialogues from '../../dialogues';
import { Person } from '.';

export default function dialogue(state = {
  active: false,
  story: false,
  current: false,
  next: false,
  participants: [],
  selection: 0,
  time: 0,
  offsetTop: 0
}, action = {}) {
  switch (action.type) {

    case 'begin':
      let d = dialogues[action.name];
      let v = d.content(d.left.map((_, i) => Person(i)), d.right.map((_, i) => Person(i + d.left.length)));

      state.active = true;
      state.story = v;
      state.participants = [d.left, d.right];

      return dialogue(state, {
        type: 'progress', choice: 0
      });


    case 'progress':
      if (!state.active) return state

      if (!state.story) {
        state.active = false;

        return state;
      }

      let b = state.story.progress(state.selection);

      console.log(b);

      state.selection = 0;
      state.story = b.story;
      state.time = 0;
      state.active = !!b.current;
      state.current = b.current;

      return state;

    case 'select':
      if (state.current.choices) {
        state.selection = Math.min(Math.max(0, action.n + state.selection), state.current.choices.length - 1);
      }

      return state;

    case 'tick':
      state.time += 1;

      return state;
  }

  return state;
}
