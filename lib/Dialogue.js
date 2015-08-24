export function Dialogue(type = 'say', args) {
  let self = {
    type, args,
    next: false,

    then(a) {
      let out = Dialogue(self.type, self.args);
      let nx = self;
      let outNx = out;

      while (nx.next) {
        outNx.next = Dialogue(nx.next.type, nx.next.args);
        outNx = outNx.next;

        nx = nx.next;
      }

      outNx.next = a;

      return out;
    },

    progress(i) {
      switch (type) {
        case 'say':
          return {
            story: self.next,
            current: {
              owner: args.owner,
              type: type,
              text: args.msg
            }
          };
        case 'question':
          return {
            story: Dialogue('choice', args.choices).then(self.next),
            current: {
              owner: args.owner,
              type: type,
              choices: args.choices,
              text: args.question
            }
          };
        case 'choice':
          return {
            story: args[i].next.then(self.next),
            current: {
              owner: args.owner,
              type: type,
              text: args[i].text
            }
          };
        case 'action':
          return {
            story: false
          };
      }

      return self.next;
    }
  };

  return self;
}

export function says(msg) {
  //console.log(...args, 'say');

  return Dialogue('say', { msg });
}

export function maybe(text) {
  return {
    then(next) {
      return { next, text };
    }
  };
}

export function asks(...args) {
  return Dialogue('question', {
    question: args[0],
    choices: args.slice(1)
  });
}

export function action(str) {
  return Dialogue('action', str);
}

let awnsers = says;
export { awnsers };

let story = says("Hello there!")
  .then(says("sup dude!"))
  .then(asks("Are you cool?",
    maybe("Nope!")
      .then(says("shit")),
    maybe("I guess so")
      .then(says("good good!").then(says("fuck you")))
  ))
  .then(says("End!"));

export function display(text, story, priest, boy) {
  let q = story.current.type == 'question';

  let totalHeight = 0;
  let l = 0;

  let h = amt => {
    totalHeight += amt;
    return amt;
  };

  let y = 0;

  let content = {
    children: [{
      x: (story.current.owner === 'Priest' ? -6 : -7.5),
      y: -9,

      scale: [3, 3],

      src: priest
    }, {
      x: (story.current.owner !== 'Priest' ? 32 : 33.5),
      y: -9,

      scale: [3, 3],

      src: boy
    }, {
      width: 128 - 4,
      height: h(Math.ceil(story.current.text.length / 24) * 7),
      x: 0,
      y: 0,

      fill: 'cornflowerblue',
    }, story.current.choices ? {
      x: 2,
      y: 2,

      children: story.current.choices.map((c, i) => {
        let height = Math.ceil(c.text.length / 24) * 7;

        y += height;

        return {
          children: [{
            x: -2,
            y: (y - height) + 12,

            width: 124 + i,
            height: h(height),

            fill: i == 0 ? 'yellow' : 'red'
          }, text(0, (y - height) + 13, c.text)]
        };
      })
    } : {}, text(2, 1, story.current.text)]
  };

  return {
    x: 2,
    y: 119 - totalHeight,

    children: [content]
  }
}
