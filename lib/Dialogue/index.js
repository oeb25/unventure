let _id = 0;

export function Wrapper(left = [], right = [], content) {
  return { left, right, content };
}

export function Dialogue(type = 'say', args) {
  let self = {
    type, args,
    next: false,
    id: _id++,

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
              name: args.name,
              type: type,
              text: args.msg
            }
          };
        case 'question':
          return {
            story: Dialogue('choice', args.choices).then(self.next),
            current: {
              name: args.name,
              type: type,
              choices: args.choices,
              text: args.question
            }
          };
        case 'choice':
          console.log(args, i);

          return {
            story: args[i].next.then(self.next),
            current: {
              name: args.name,
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
  let out = {
    then(next) {
      let wup = { next, text };

      wup.name = out.name;

      return wup;
    }
  };

  return out;
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

export function Person(name) {
  return a => {
    let b = a;
    if (b.args) {
      b.args.name = name;
    } else {
      b.name = name;
    }

    return b;
  }
}

let awnsers = says;
export { awnsers };

export { view } from './view';
