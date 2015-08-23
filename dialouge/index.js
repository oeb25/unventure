//import { m, q, a, r } from '../lib/Dialog';
import { boy, priest, Conversation } from './Persons';


// Ignore everything above this!

const storys = {

/*
  'enter church': [
    m(priest, "Welcome to my church! What can I do for you?"),
    m(boy, "I have sined father :'("),
    m(priest, "YOU BASTERD! WHAT HAVE YOU DONE!?!!"),
    m(boy, "I.. I.. I have stolen.."),
    q(priest, "What have you stolen my child?", boy, [
      a("I have stolen fish my lord!", 0),
      a("FISH! JUST FISH! HELP ME LORD!", 0)
    ],[
      r("Fish you say?? Tell me, was it any good?")
    ]),
    m(boy, "What? What are you talking about?")
  ]
*/

  'enter church alternative version': new Conversation([
    priest.says("Welcome to my church! What can I do for you?"),
    boy.says("I have sined father :'("),
    priest.says("YOU BASTERD! WHAT HAVE YOU DONE!?!!"),
    boy.says("I... I.. I have stolen.."),
    priest.asks(boy, "What have you stolen my child?")
      .awnsers(
        boy.says("I have stolen fish my lord!", 0),
        boy.says("FISH! JUST FISH! HELP ME LORD!", 0),
        boy.says("Two bananas.. I haven't eaten for days!", 1)
      ).responses(
        priest.says("Fish you say?? Tell me, was it any good?"),
        priest.says("Nobody likes bananas anyway :S")
      ),
    boy.says("What? What are you talking about?")
  ]),

  'random': new Conversation([
    priest.asks(boy, "What do you want to do?")
      .awnsers(
        boy.says("Go swimming!", 0),
        boy.says("Finish this game!", 1),
        boy.says("Eat two and a half bananas!", 2)
      ).responses(
        priest.says("Aright! Let's head to the sea!"),
        priest.says("Well then... Go to it!"),
        priest.asks(boy, "Can I have one??")
          .awnsers(
            boy.says("HELL NO!", 0),
            boy.says("Sure thing! Go ahead and follow!", 1),
            boy.says("Go to hell you bastard!")
          ).responses(
            priest.says("Calm down love, I'm not trying to be rude!"),
            priest.says("Well then, on the road!")
          )
      ),
    boy.says("What? What are you talking about?")
  ])

};

// Ignore everything below this

export default storys;
