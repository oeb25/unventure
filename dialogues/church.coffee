{ says, asks, maybe, action, Person, Wrapper } = require '../lib/Dialogue'

module.exports = Wrapper ['boy', 'priest'], ([boy, priest]) ->

  stealFish = priest says "FISH! Omg i luv fish! Can i have some!?!?"

  c = priest says "Aww.. Too bad, I know the best place to find fish tho!"
    .then boy says "Are you serious?"
    .then priest says "Yes!"
    .then boy says "Can I change my mind? ;)"

  boy says "Hello there!"
    .then priest says "Why welcome son!"
    .then boy says "I've sined father!"
    .then priest asks "You have? Oh, that's too bad! What's the matter?",
      priest maybe "I've eaten 10 bananas"
        .then priest asks "That's aright, nobody like bananas any way!",
          maybe "Ah... okay... then I go back home"
            .then action "game over"
          maybe "Ikr? Bananas are awful. I stole fish, no kidding now."
            .then stealFish
      maybe "I've stolen fish"
        .then stealFish

    .then boy says "You want to steal fish?"
    .then priest asks "YES! Will you teach me",
      maybe "Well..."
        .then priest asks "Come on, please!",
          maybe "Aright then..."
            .then priest says "WUHU! ADVENTURE LIES AHEAD!"
          maybe "What the heck, come along!"
            .then priest says "WUHU! ADVENTURE LIES AHEAD!"

      maybe "No way! Not gonna happen!"
        .then c
    .then priest says "Follow me! I know the greatest place to get the freashest fish!"
    .then priest says "Follow me! I know the greatest place to get the freashest fish!"
