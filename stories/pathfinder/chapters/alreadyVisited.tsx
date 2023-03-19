import * as React from 'react'
import { Section, Chapter, When, C } from 'core/components'
import useInventory from 'core/hooks/use-inventory'
import { PageType } from 'core/types'
import { BulletedList } from 'core/components/widgets'
import ChapterPage from './ChapterPage'

export const Page: PageType = () => {
    const [again, wantToBuy] = useInventory(['again', 'wantToBuy'])

    return (
        <ChapterPage>
            <Chapter filename="alreadyVisited">
                <Section>
                    <p>
                        You push the heavy wooden door open slowly. The sound of bells tinkles
                        through the air as you take in the sights and smells. The hut is just as
                        small as you remember, still dimly lit and packed to the gills. You run your
                        hand across a leather book, jumping back suddenly as runes swim in your
                        vision. You keep your hands to yourself after that.
                    </p>
                    <p>
                        The Shopkeeper is nowhere to be seen, though on the counter rests a small
                        pair of pliers and a small, thumb-sized lantern.
                    </p>
                    <p>You hear a sharp voice behind you:</p>
                    <p>"What do you want this time?"</p>
                    <p>
                        You whirl around, The Shopkeeper is sitting in a plain wooden rocking chair,
                        a thick spell book in her lap. She looks mildly irritated at the
                        interruption but not <i>too</i> irritated.
                    </p>
                    <p>{again}</p>
                    {!again && (
                        <C
                            options={[
                                [
                                    '"Tell me the dwarves\' story again."',
                                    '"I\'d like to buy another gem."'
                                ]
                            ]}
                            widget={BulletedList}
                            tag="again"
                        />
                    )}
                </Section>
                <Section>
                    <When condition={again && again.includes('story')}>
                        <p>
                            She pins you down with her deep stare, each of her four eyes scanning
                            your every feature. The silence is deafening.
                        </p>
                        <p>Finally, she snaps the book shut.</p>
                        <p>
                            "Come, sit. I'll fetch us some{' '}
                            <C options={[['tea']]} tag="tea" next="chapter4" />
                            ."
                        </p>
                    </When>
                    <When condition={again && again.includes('gem')}>
                        <p>
                            She pins you down with her deep stare, each of her four eyes scanning
                            your every feature. The silence is deafening.
                        </p>
                        <p>
                            {!wantToBuy && (
                                <>
                                    "Are you sure?" she asks. You suspect she's considering it.{' '}
                                    <C options={[['Yes', 'no']]} tag="wantToBuy" next="chapter5" />
                                </>
                            )}
                        </p>
                    </When>
                </Section>
            </Chapter>
        </ChapterPage>
    )
}
