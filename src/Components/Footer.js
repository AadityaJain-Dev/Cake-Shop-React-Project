let quote = () => {
    let lucky_number = Math.floor(Math.random() * 60)
    let quote = [
        "A party without cake is just a meeting.",
        "A ready-to-eat slice of heaven.",
        "A smile with a frosting on it.",
        "Baked just right.",
        "Because every cake has a story to tell.",
        "Bring on the cake!",
        "Cake never asks me dumb questions. Cake understands.",
        "Cake is for life, not just for birthdays!",
        "Come to the dark side. We have cupcakes.",
        "Crazy for cakes!",
        "Defender of delectable treats.",
        "Don’t wait until it’s too late. Eat that slice of cake!",
        "Eat, sleep, and stay happy.",
        "For goodness sake, eat some cake!",
        "Forget the calories and just be happy.",
        "Forget the fork and dig right in!",
        "Fresh out of the oven.",
        "Happiness starts here.",
        "How do I like my eggs? In a cake, duh.",
        "I didn’t seek out the cake. The cake came to me.",
        "I like big bundts and I cannot lie.",
        "I'll take another slice of that.",
        "I’m not a cake addict! I’m just a little clingy to it.",
        "If eating cake is wrong, then I don’t want to be right.",
        "If I don’t have some cake soon, I might die.",
        "If I was turned into cake, I would eat myself before anyone else could.",
        "If there’s a cake in front of you, then you shouldn’t look any further for joy!",
        "If we are what we eat, then I’m awfully sweet.",
        "Just another sweet moment in life.",
        "Let's face it, a nice creamy chocolate cake does a lot for a lot of people; it does for me.",
        "Life is better with sprinkles on top.",
        "Life is fun, eat it up.",
        "Life is short, so make it sweet.",
        "Live the sweet life!",
        "Look upon the world like it’s a gigantic birthday cake. Take a piece, but don’t take too much.",
        "Love at first bite.",
        "Made just for me.",
        "Merely staring at cake is putting pounds on me.",
        "My OCD (Obsessive Cake Disorder) is getting out of control!",
        "My sweet tooth is tingling.",
        "Nothing in this world is better than cake but more cake.",
        "Obsessive doesn’t even begin to describe my love for cake. I’ll even fight little children if I have to.",
        "Put “eat cake” on top of your to-do list today and you’re sure to get at least one task done.",
        "Remember, you don’t need to justify eating a whole cake to anyone.",
        "Stuffing my face with frosting.",
        "Sugarcoating everything is my specialty.",
        "Sweetest slice of paradise.",
        "Taking pleasure to the next level.",
        "This is just too beautiful to eat!",
        "Topped with a smile.",
        "Try it once, and forget the rest!",
        "Unspeakably delicious!",
        "What a heavenly delight!",
        "Whatever sprinkles your cupcake!",
        "When fun meets yum.",
        "When in doubt, eat a cake.",
        "Why do I drink diet soda? It’s so I can eat cake later.",
        "Without icing, it’s just bread. I don’t like bread.",
        "You think I won’t eat this cake? Fat chance!"
    ]
    return quote[lucky_number]
}


export const Footer = () => {

    return (
        <div class="position-relative mt-5">
            <div className="bg-primary text-center p-2 position-absolute bottom-0 w-100">
                <span className="text-light fw-bold">
                    {quote()}
                    {/* {alert(quote())} */}
                </span>

            </div>
        </div>
    )
}