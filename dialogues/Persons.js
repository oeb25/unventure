class Person {
  constructor(name) {
    this.name = name;
  }

  says(msg, action) {
    return new Message(this, msg, action);
  }

  asks(to, question) {
    return {
      awnsers: (...awnsers) => {
        console.log(awnsers);
        return {
          responses: (...responses) => {
            console.log(responses);
            return new Question(this, question, awnsers, responses);
          }
        }
      }
    };
  }
}

export class Conversation {
  constructor(content) {
    this.content = content;

    this.step = 0;

    console.log(this);
  }

  get type() {
    return this.content[this.step].type;
  }
  get ended() {
    return this.step == this.content.length;
  }

  next(...args) {
    this.step += this.content[this.step].handle(...args) ? 1 : 0;
  }

  display() {
    return {
      x: 100,
      y: 100,

      width: 100,
      height: 100,

      fill: 'red'
    }
  }
}

class Message {
  constructor(owner, msg, action = true) {
    this.owner = owner;
    this.msg = msg;
    this.action = action;

    this.type = 'say';
  }

  handle() {
    console.log(`${this.owner.name}: ${this.msg}`);

    return typeof this.action == 'function' ? this.action() : this.action;
  }
}

class Question extends Message {
  constructor(owner, msg, awnsers, responses) {
    super(owner, msg);

    this.type = 'question';
    this.awnsers = awnsers;
    this.responses = responses;

    this.choice = void 0;
    this.step = 0;

    console.log(this);
  }

  handle(choice) {
    switch (this.step) {
      case 0:
        console.log(`${this.owner.name}: ${this.msg}`);

        this.step += 1;

        return false;
      case 1:
        this.choice = this.awnsers[choice].handle();

        this.step += 1;

        return false;
      default:
      console.log('plz', this.responses[this.choice]);

        let a = this.responses[this.choice].handle(1);

        console.log(a, 'WUP WUP!');

        if (a) this.step += 1;

        return a;
    }
  }
}

export const boy = new Person('Boy');
export const priest = new Person('Priest');
