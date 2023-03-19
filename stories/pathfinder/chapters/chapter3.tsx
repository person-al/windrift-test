import * as React from 'react'
import { C, R, Section, Chapter, Nav, When } from 'core/components'
import ResetButton from 'core/components/ui/reset-button'
import { BulletedList } from 'core/components/widgets'
import useInventory from 'core/hooks/use-inventory'
import { Next, PageType } from 'core/types'
import { wordFromInventory } from 'core/util'
import ChapterPage from './ChapterPage'

export const Page: PageType = () => {
    // Handle the stuff from chapter 1
    const [pocketAnimal, pocketBagel, locationChoice] = useInventory([
        'pocketAnimal',
        'pocketBagel',
        'locationChoice'
    ])
    const pockets = ['a piece of lint', 'a sparkly purple hairtie', 'a ten dollar bill']
    if (pocketAnimal && !pocketAnimal.includes('leave')) {
        pockets.push(`a small ceramic ${wordFromInventory(pocketAnimal)}`)
    }
    if (pocketBagel && pocketBagel.includes('take')) {
        pockets.push(`a slightly squished bagel`)
    }

    // Set up for chapter 3
    const [identity, firstChoice, flattery, honesty, offering] = useInventory([
        'identity',
        'firstChoice',
        'flattery',
        'honesty',
        'offering'
    ])
    const [skeptic, setSkeptic] = React.useState<boolean>(false)

    React.useEffect(() => {
        if (
            identity &&
            !skeptic &&
            (identity.includes('trickster') || identity.includes('treasure'))
        ) {
            setSkeptic(true)
        }
    }, [identity, skeptic, setSkeptic])

    return (
        <ChapterPage>
            <Chapter filename="chapter3">
                <Section>
                    <p>
                        You push the heavy wooden door open slowly. The sound of bells tinkles
                        through the air as you take in the sights and smells. It's a small, one-room
                        hut, dimly lit by a single light-bulb hanging from the ceiling. Every square
                        inch is packed with velvet, jewels, and bottled body parts. It smells like
                        magic and dust. In front of you there's a wooden counter, nearly invisible under the clutter.
                        And behind the counter, with her back to you, stands an old woman. Without turning around she says,
                        "I smell a human. Who goes there and what do you seek?"
                    </p>
                    {identity ? (
                        <p>
                            You answer without hesitating:{' '}
                            <R
                                tag="identity"
                                options={{
                                    treasure:
                                        '"I am a treasure-hunter. I seek the wealth of your experience."',
                                    artist: '"I am an artist. I seek the intangible that makes life worth living."',
                                    explorer: '"I am an explorer: adventure is my goal."',
                                    trickster: '"I am a trickster. I love any kind of game."'
                                }}
                            />
                        </p>
                    ) : (
                        <p>
                            Who are you? Are you a{' '}
                            <C
                                options={[['treasure-hunter', 'artist', 'explorer', 'trickster']]}
                                tag="identity"
                            />
                            ?
                        </p>
                    )}
                </Section>
                <Section>
                    <p>
                        The old woman turns, two pinpoints of red light shining from deep in a black
                        hood. She pushes the hood back to reveal a shock of white hair; wrinkles
                        running rivers across her cheekbones. Those red lights, it turns out, are
                        two of her four eyes: the first two a glowing ruby red, the second two a
                        vivid blue. You try your best not to shudder.
                    </p>
                    <p>
                        "And tell me, {identity}, what makes you think <i>I</i> have what you seek?"
                    </p>
                    <When
                        condition={firstChoice}
                        otherwise={
                            <p>
                                You need to make a positive first impression. But what does that
                                mean for a creature like this? You can try to{' '}
                                <C
                                    options={[['flatter her', 'intimidate her', 'just be honest']]}
                                    tag="firstChoice"
                                />
                                .
                            </p>
                        }>
                        <p>
                            <R
                                tag="firstChoice"
                                options={{
                                    flatter:
                                        '"I\'ve heard great things about your collection. If you don\'t have it, no one will."',
                                    intimidate: '"This isn\'t my first rodeo. I know who you are."',
                                    honest: "\"I don't know. But I've been told that those wish to understand the dwarves' final art piece must come to you.\""
                                }}
                            />
                        </p>
                    </When>
                </Section>
                <Section>
                    <When condition={firstChoice && firstChoice.includes('intimidate')}>
                        <p>
                            The light flickers, then dims further. Your toes curl as the heat flees
                            your body like rats from a plague. The Shopkeeper grows impossibly large
                            before your very eyes. Her blue set of eyes, each now as big as your
                            head, loom inches from your nose.
                        </p>

                        <p>
                            "Oh, do you now?" she asks sweetly. "Then you must know <i>just</i> how
                            foolish you are to come here, little mortal. <i>Don't you</i>."
                        </p>

                        <p>
                            "I simply mean to say," you backtrack, struggling to keep your voice
                            steady. No need to betray how close you are to wetting your pants. "I
                            simply mean to say that I've heard great things about your collection.
                            If you don't have it, no one will."
                        </p>

                        <p>
                            It's as if your previous blunder had never occured. In the blink of an
                            eye, she's back to her normal size, standing behind the counter smiling
                            sweetly.
                        </p>

                        <C options={[['phew!']]} tag="flattery" last="" next={Next.None} />
                    </When>
                    <When condition={(firstChoice && firstChoice.includes('flatter')) || flattery}>
                        <p>
                            "You're absolutely right, of course," she croons. "What <i>are</i> you
                            looking for?"
                        </p>

                        <p>
                            You hestiate for a moment.{' '}
                            <R
                                tag="identity"
                                options={{
                                    trickster:
                                        '"I\'ve heard of an ancient game, one made up of seven gems. Have you heard of it?"',
                                    treasure:
                                        '"I\'ve heard of seven gems, crafted by dwarves: each more valuable than the last."',
                                    explorer:
                                        '"I\'ve heard of an unfinished adventure: that of seven dwarves forced to leave their treasure behind."',
                                    artist: '"I\'ve heard of a glorious story unfinished. That of seven dwarves forced to leave their mountain. Their final poem lies dormant, waiting to be told."'
                                }}
                            />
                        </p>

                        <p>
                            <R
                                tag="identity"
                                options={{
                                    trickster: '"Hah! That\'s a game that will play you, child." ',
                                    treasure:
                                        '"Hah! That is no simple trinket, pet. If these gems were made for traders like us, I\'d be seeking them myself." ',
                                    explorer:
                                        '"Hah! Do you seek to finish their adventure for them? Do you have what it takes?" ',
                                    artist: '"Hah! You humans truly are as foolish romantics." '
                                }}
                            />
                            She sees the disappointment on your face and lets out a hum. "No matter,
                            little one.{' '}
                            <C
                                options={[['Perhaps I can at least tell you their history...']]}
                                tag="honesty"
                                next={Next.None}
                            />
                            ."
                        </p>
                    </When>
                    <When condition={(firstChoice && firstChoice.includes('honest')) || honesty}>
                        <p>She smiles knowingly, and you jump at a realization.</p>
                        <p>"Of course," you say, "a story like this must be paid for."</p>
                        <p>She nods, "Yes, of course. A small token for a small story."</p>
                        <p>
                            You reach into your pockets, your fingers rifling through your options:
                        </p>
                        <C options={[pockets]} tag="offering" widget={BulletedList} />
                        {offering && <p>You offer her {offering}.</p>}
                    </When>
                </Section>
                <Section>
                    <When
                        condition={
                            firstChoice &&
                            offering &&
                            firstChoice.includes('intimidate') &&
                            offering.includes('lint')
                        }>
                        <p>The Shopkeeper shrinks away from you, her face writhing with rage.</p>
                        <p>
                            "You were foolish to come, mortal. And even more foolish to offend me
                            twice. Not to worry, I won't make you leave." She cackles, her red eyes
                            sparkling. "No, I won't be so merciful."
                        </p>
                        <p>Your skin begins to tighten: the pain is unimaginable.</p>
                        <p>
                            You look over to The Shopkeeper, whose laughter has faded to a
                            bone-chilling grin, "I've needed a new gargoyle. The last one finished
                            his sentence years ago." Even her pointy teeth sparkle like laughter.
                            "Don't worry, pet. A few years of customer service will fix your
                            attitude right up!"
                        </p>
                        <ResetButton children="Start Over" />
                    </When>
                    <When
                        condition={
                            firstChoice &&
                            offering &&
                            !firstChoice.includes('intimidate') &&
                            offering.includes('lint')
                        }>
                        <p>The Shopkeeper shrinks away from you, her face writhing with rage.</p>
                        <p>
                            "You were foolish to come, mortal. And even more foolish to offend me.
                            You're lucky I'm about to let you leave alive."
                        </p>
                        <p>
                            You find yourself alone
                            {locationChoice.includes('subway')
                                ? ` on ${locationChoice}`
                                : ` in ${locationChoice}`}
                            , not a hint of the shop to be found. You'll try again soon, after she's
                            had time to forget you. Hopefully.
                        </p>
                        <ResetButton children="Start Over" />
                    </When>
                    <R
                        tag="offering"
                        options={{
                            hairtie: (
                                <p>
                                    "I suppose that will do", she sighs, tying back her wiry silver
                                    hair. You almost wish you'd offered something else. The clearer
                                    her face becomes, the scarier it is.
                                </p>
                            ),
                            dollar: (
                                <p>
                                    "Oh, splendid!" She takes it quickly and claps her hands. "Ever
                                    since you idiots invented social security numbers, it's been
                                    near <i>impossible</i> to get human money."
                                </p>
                            ),
                            frog: (
                                <p>
                                    "Oh, splendid!" She claps her hands gleefully. "Familiars always
                                    go quickly." The frog grows slimy and warm, jumping out of your
                                    hands and disappearing around a corner.
                                </p>
                            ),
                            bagel: (
                                <p>
                                    "Oh, splendid!" She takes it quickly and claps her hands. "Ever
                                    since you idiots invented social security numbers, it's been
                                    near <i>impossible</i> to buy a decent bagel myself."
                                </p>
                            ),
                            tabby: (
                                <p>
                                    "Oh, splendid!" She claps her hands gleefully. "Familiars always
                                    go quickly." The cat grows heavy and warm, jumping out of your
                                    hands and disappearing around a corner.
                                </p>
                            )
                        }}
                    />
                    <When condition={offering && !offering.includes('lint')}>
                        <p>
                            Against all odds, The Shopkeeper has seated you in a plush, purple
                            velvet chair. She sits across from you, laying comfortably against a
                            wooden rocking chair. Against all odds, you are both holding steaming
                            cups of tea. You're unsure if it's safe to drink.
                        </p>
                        <p>
                            "You're smart," the old woman laughs, resting a bony chin in an equally
                            bony hand. Her fingers are lined with small, feathery tentacles that
                            caress her face. "I'll give you that. Many humans would be dead by now.
                            Don't worry, my tea is a gift, not a curse."
                        </p>
                        <p>
                            You take a tentative sip, as afraid to offend her as you are of the tea.
                            It tastes like chamomile.
                        </p>
                        <p>
                            All four eyes crinkle in a smile. "Now, you wished to hear of the
                            dwarves' final poem. What do you know already?"
                        </p>
                        <p>
                            "I know it's encased in a series of gems," you share eagerly.
                            <R
                                tag="identity"
                                options={{
                                    trickster: ' "And the gems are connected, like puzzle pieces."',
                                    treasure: ' "Each more valuable than the last."',
                                    explorer:
                                        ' "With the poem split across them. Whether the gems or poem are more valuable remains to be seen."',
                                    artist: " \"I've heard it's possible to release the poem, though I'm unsure how.\""
                                }}
                            />
                        </p>
                        <p>
                            "As expected," the old woman sighs, pausing to sip some tea.
                            <R
                                tag="offering"
                                options={{
                                    tabby: "Your roommate's tabby appears from behind a dusty lamp, rubbing its head against her black-clad ankles. ",
                                    bagel: ' She pulls out the bagel and takes a large, jagged bite, chewing slowly before continuing. '
                                }}
                            />{' '}
                            "As expected, you mortals removed everything that matters from the
                            story."
                        </p>
                        <p>
                            She leans forward, her tone underscoring the seriousness of her words.
                            "Sparkle means nothing in this world. <i>Nothing</i> compared to the raw
                            power of magic. And that's what they are--" she leans back again, her
                            eyes shining. "They are not gems. They are pure magic incarnate."
                        </p>
                        <p>
                            You take your time drinking the tea, letting the natural pause mask{' '}
                            <C options={[['your thoughts.']]} tag="chapter3-yourthoughts" />{' '}
                            <R
                                tag="identity"
                                options={{
                                    trickster:
                                        "You're here to play a little game, and while the gems being some kind of physical manifestation of magic doesn't prevent that... Well, you're not sure exactly what that means.",
                                    treasure:
                                        "You're here for treasure, and magic is much harder to sell than rare gemstones.",
                                    explorer:
                                        'Your chest is beginning to hum with excitement. You came in search of adventure and "magic incarnate" sounds like quite the adventure.',
                                    artist: 'Your chest is beginning to hum with excitement. You came in search of art and adventure and "magic incarnate" sounds like quite the medium to play with.'
                                }}
                            />
                        </p>
                    </When>
                </Section>
                <Section>
                    <When condition={offering && !offering.includes('lint')}>
                        <p>
                            The merchant across from you chuckles lightly. "I see you, human," she
                            practically purrs. "I see{' '}
                            {skeptic ? (
                                <span>
                                    your interest waning. How like your species! Unable to see past
                                    the sparkle. Still, you remind me of myself, such{' '}
                                    <i>excitement</i> for the trade. It's cute.
                                </span>
                            ) : (
                                'the sparkle in your eye. Powerful magic appeals to you! You remind me of a younger version of myself. Good instincts, but so much to learn.'
                            )}
                            "
                        </p>

                        <p>
                            You school your face into as neutral an expression you can muster. No
                            reason to tip your hand before a negotiation. Plus, you must hide how
                            you feel about...you hold back a shudder as the words{' '}
                            <i>you remind me of myself</i> ring in your ears. You glance again at
                            the hollow eyes, the{' '}
                            <R
                                tag="offering"
                                options={{
                                    hairtie: 'tied back '
                                }}
                            />
                            silver hair that practically crackles when she moves. Hopefully this is
                            how her species manifests and not a result of working with powerful
                            magic all day. Hopefully.
                        </p>

                        <p>
                            "I'm just surprised," you say. "Nothing in my research mentioned
                            unusually powerful magic. Just magical gems."
                        </p>

                        <p>
                            "These dwarves came from Ruby Mountain," The Shopkeeper replies, "a
                            village of miners. Of course they'd choose a gem shape. But mark my
                            words, no jeweler will be able to place the material. No one knows what
                            they are or what magic was used to create them. There's nothing like
                            them on any planet or plane I've travelled. And trust me," her red lips
                            curled into a slight sneer, "I've seen many."
                        </p>

                        <p>"Is the poem part real?"</p>

                        <p>
                            "<Nav text="Let me tell it proper." next="chapter4" />" She settles back
                            in her chair, her rocking taking a slow, rhythmic pace.
                        </p>
                    </When>
                </Section>
            </Chapter>
        </ChapterPage>
    )
}
