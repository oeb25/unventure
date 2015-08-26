{ says, asks, maybe, action, Person, Wrapper } = require '../lib/Dialogue'

module.exports = Wrapper ['boy', 'priest'], ['watermelon'], ([boy, priest], [watermelon]) ->
  watermelonIn = watermelon says "Okay then, I follow you"
    .then action "Watermelon follows you from this moment, his wisdom gives you an entirely different view from history and time so your timer goes down half"

  watermelonOut = watermelon says "I'm outta here"
    .then action "Watermelon runs away, no boosts"

  watermelonAsks =  watermelon asks "Oh…I think I can trust you…I will join you, but you have to promise that you won’t eat me.",
    maybe "You look tasty, ain’t gonna promise u dat."
      .then watermelonOut
    maybe "Of course we won’t eat a wise watermelon like you."
      .then watermelonIn

  watermelonRuns = watermelon says "Humans are evil indeed, I better run before you eat me"
    .then action "Watermelon runs aways"

  dramaticStory = watermelon says "A human ate a watermelon."
    .then watermelon says "We don’t remember how or who, but suddenly all humans started to eat watermelons (apparently we are super tasty)."
    .then watermelon says "Our great kingdom came down. As humans were eating us, they also conquered everything we owned and stole our gods and religions..."
    .then watermelon says "... even the Golden Tower and its secrets..."
    .then watermelon says "We were devastated, so we came up with an idea: to be quite is to be hidden."
    .then watermelon says "We stopped talking and were hidden in the ground for ages, but, as generations went by, the most of us forgot how to speak."
    .then watermelon says "Humans were really rich and wise because of our goods and knowledge, but then they started to lose it all, as they always do."
    .then watermelon says "They fought in senseless wars and as the battles were getting rougher they destroyed all that they had stolen from us..."
    .then watermelon asks "...so our great kingdom was finally forgotten and lost in time...",
      maybe "I don't believe that story, humans are no evil"
        .then watermelonRuns
      maybe "Aw...that is sad, we humans are evil indeed, but this priest and me...no. We are good people in search for fish, would you join us to share your wisdom?"
        .then watermelonAsks

  watermStory4real = watermelon says "A long time ago we were millions. stik loves poop. Millions of wise watermelons living in peace with other wise species and so on."
    .then watermelon says "We built palaces, castles and in the northern lands of the Atlantis we built our huge and precious Golden Tower."
    .then watermelon says "It was a tower so big that some days you could touch the clouds and sense the fresh air as birds do."
    .then watermelon says "That was the more beautiful thing about the watermelon kingdom, a gigantic tower made of gold."
    .then watermelon asks "But, as we were confident, we didn't notice the little groups of humans that were reuniting all around the world, and the saddest thing happened.",
      maybe "Tired already, gonna eat you up!"
        .then eatWaterMelon
      maybe "What happened?"
        .then dramaticStory
  # Shitty facts leads to shitty results
  shittyFacts = watermelon says "They say there is 24 hours in a day, but it is actually false."
    .then watermelon says "The Earth spins on its axis for exactly 23 hours and 56 minutes."
    .then watermelon says "But we add 4 extra minutes."
    .then watermelon says "The reason humans do that is because the distance in which you have orbited the sun is so great that it takes a little extra time for you just to face the sun again"
    .then priest says "Aw, interesting"
    .then watermelon says "Well, shitty facts leads to shitty results, so c u boyz"
    .then action "Watermelon quest ends, no boosts"

  watermelonStories = watermelon asks "Well, you could choose the easy path and ask about a random rare fact from earth or…you could ask about the forgotten watermelon kingdom...only if you are brave enough…",
        maybe "Lol I wanna know a random rare fact pls"
          .then shittyFacts
        maybe "Oh my god, what is the forgotten watermelon kingdom?"
          .then watermStory4real

  OlofmeisterSucks = watermelon asks "That is not the right question, human. You should ask yourself what kind of knowledge will you be ready to handle without driving yourself mad.",
    maybe "What a cocky watermelon, Imma eat you up"
      .then eatWaterMelon
    maybe "Oh, that's right, could you suggest something?"
      .then watermelonStories

  waterMelonHatesYou = watermelon says "YOU WENT TOO FAR HUMANS"
    .then action "Watermelon quest ends, watermelon won't talk to you again"

  blowMind = watermelon asks "Of course you could, I am the wise watermelon",
    maybe "Wait a minute. You just said some lines back that you were 'a wise...blahblah' and now you say u are 'the wise...blahblah'. I'm confused, are u the only gigantic talking fruit or there are more?"
      .then waterMelonHatesYou
    maybe "Great! What can you teach us?"
      .then OlofmeisterSucks

  eatWaterMelon = watermelon says "Wot da..."
    .then action "eat watermelon"

  toEatOrNotToEat = watermelon says "You are right indeed, I am not God, just a wise watermelon"
    .then boy says "Kek, I didn't know that fruits could talk."
    .then watermelon asks "There are so many unknown things for the man and the man only, but known for fruits and other wise elements from earth.",
      maybe "I don't really care about that, but I'm hungry, gonna eat u soz."
        .then eatWaterMelon
      maybe "Omg, maybe we could learn something from you"
        .then blowMind

  talkToWaterMelon = watermelon says "Greetings, foreigns"
    .then boy says "Wot! It is talking"
    .then priest says "Oh gosh"
    .then watermelon asks "Of course I'm talking. I'm God itself",
      maybe "No u not, God is not a ball."
        .then toEatOrNotToEat
      maybe "Oh my... we found him :O"
        .then priest says "LETS PRAY TO THE LOOOOOOOORD!"


  ###

    !?!??!?!?!?!??!?!¡START HERE!!!?!?!??!?!?!

  ###
  boy asks "What is that? (test)",
    maybe "Nutin, just keep on going"
      .then boy says "kk, lets go then"
    maybe "Idk, maybe we should check"
      .then talkToWaterMelon
