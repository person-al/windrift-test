import * as React from 'react'
import { C, Section, Chapter } from 'core/components'
import { PageType } from 'core/types'
import useInventory from 'core/hooks/use-inventory'
import ChapterPage from './ChapterPage'

export const Page: PageType = () => {
    const [wantToBuy] = useInventory(['wantToBuy'])

    return (
        <ChapterPage>
            <Chapter filename="chapter4">
                <Section>
                    <p>
                        It was a year before time, before our realms{' '}
                        <C options={[['split']]} tag="chapter4-1" />.
                    </p>
                </Section>
                <Section>
                    <p>
                        They say Ruby Mountain lay to the west of Centra by 300 miles or so. But
                        there's no trace of it now. Regardless, it was almost as wide as it was
                        tall, a fertile land home to a small village of dwarves. Now some of the
                        dwarves farmed, and some were merchants, but that village in particular was
                        known for its miners. Ruby Mountain, as you've likely guessed, held the
                        largest, clearest, most beautiful rubies the world has ever{' '}
                        <C options={[['seen']]} tag="chapter4-2" />.
                    </p>
                </Section>
                <Section>
                    <p>
                        Mining is taxing physical labor, but it leaves the mouth and the mind more
                        free. And so, a strong culture of storytelling and art developed along the
                        mountain. Ruby Mountain became known for its stories, songs, and poems just
                        as much as its <C options={[['rubies']]} tag="chapter4-3" />.
                    </p>
                </Section>
                <Section>
                    <p>
                        Such is the world that seven dwarves, their names lost to time, came into
                        their prime. While panning for rubies, they formed what you young humans
                        would call an "art collective", a secret society that met once a month,
                        pushing themselves and eachother in their craft. They dabbled in all forms
                        of art: painting, stories, pottery, metalwork. But their ultimate love was
                        poetry. Their 3-letter poetry set off a revolution and is being performed in
                        Centra to this <C options={[['day']]} tag="chapter4-4" />.
                    </p>
                </Section>
                <Section>
                    <p>
                        But no land knows peace forever. The world experienced an earthquake,
                        stronger than anything we've felt since. The mountain nearly collapsed in on
                        itself, killing many of the villagers and destroying the mines they'd so
                        lovingly tended. Then, worse: a poison rained from the sky, rendering their
                        farms useless. The villagers were forced to flee, struggling to survive
                        along with the rest of the thriving masses. It was a dark time: full of
                        fighting and <C options={[['strife']]} tag="chapter4-5" />.
                    </p>
                </Section>
                <Section>
                    <p>
                        The friends knew they may never see each-other again. And even if they did,
                        the days of merry-making were over. It was time to survive. So they came
                        together for one final art piece: a poem that took inspiration from each of
                        them, that changed as it learned and grew and saw more of the world:
                        regardless of whether or not they were there to help it. Whether it was
                        spell, summons, or potion, we do not know. But the outcome, the gems, are
                        magnificant. No one has produced anything like it since. They say the gems
                        are still taking in the world, waiting for the right moment to release their
                        poem.
                    </p>

                    <p>
                        <C options={[['You find your voice.']]} tag="chapter4-6" />
                    </p>
                </Section>
                <Section>
                    <p>"How do you release the poem?" you ask, your voice weak in awe.</p>

                    <p>
                        "It is said...that destroying a gem releases part of the poem. But I
                        couldn't bear to do that, so I really don't know. Besides, seven potential
                        poems are far more valuable than one complete poem, right?"
                    </p>

                    <p>
                        You smile. "Ah, so you <i>do</i> have the gems."
                    </p>

                    <p>
                        The Shopkeeper's mouth clenches tight. "Perhaps." She practically spits out
                        the word.
                    </p>

                    <p>
                        "Would you ever be willing to part with one?" the words tumble out of your
                        mouth before you can stop them.
                    </p>

                    <p>
                        Four eyes turn to stare at you, unblinking. She takes a slow sip of tea as
                        she examines your soul.
                    </p>

                    <p>
                        "These are magical objects. They hold great historical value, but beyond
                        that, they are unsellable. You will not find riches from these, lord knows
                        I've held them for the last hundred thousand years with no profit. They will
                        provide...adventure and excitement. They're a beautiful piece of history.
                        And if you're willing to destroy one, maybe even a beautiful piece of art.
                        Are you sure you want one?"
                    </p>

                    <p>
                        {!wantToBuy && (
                            <>
                                <C options={[['Yes', 'no']]} tag="wantToBuy" next="chapter5" />?
                            </>
                        )}
                    </p>
                </Section>
            </Chapter>
        </ChapterPage>
    )
}
