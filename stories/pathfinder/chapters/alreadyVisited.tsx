import * as React from 'react'
import { Section, Chapter, Nav, When, C } from 'core/components'
import useInventory from 'core/hooks/use-inventory'
import { Next, PageType } from 'core/types'
import { BulletedList } from 'core/components/widgets'
import ChapterPage from './ChapterPage'

export const Page: PageType = () => {
    const [hasMinted] = React.useState<boolean>(false)
    const [isSubscriber] = React.useState<boolean>(false)
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
                        pair of pliers and an ITEM DETAIL that looks{' '}
                        {isSubscriber ? 'just like the one she gave you' : 'oddly familiar'}.
                    </p>
                    <p>You hear a sharp voice behind you:</p>
                    <p>"What do you want this time?"</p>
                    <p>
                        You whirl around, The Shopkeeper is sitting in a plain wooden rocking chair,
                        a thick spell book in her lap. She looks mildly irritated at the
                        interruption but not <i>too</i> irritated.
                    </p>
                    <p>{again}</p>
                    {!again && !isSubscriber && hasMinted && (
                        <ul>
                            <li>
                                <Nav
                                    text='"Do you have anything else I might be interested in?"'
                                    next="chapter5"
                                    tag="wantToSubscribe"
                                />
                            </li>
                            <li>
                                <Nav
                                    text={'"Tell me the dwarves\' story again."'}
                                    next={Next.Section}
                                    tag="again"
                                />
                            </li>
                        </ul>
                    )}
                    {!again && isSubscriber && !hasMinted && (
                        <C
                            options={[
                                [
                                    '"Can you show me the dwarves\' gem again?"',
                                    '"Tell me the dwarves\' story again."'
                                ]
                            ]}
                            widget={BulletedList}
                            tag="again"
                        />
                    )}
                    {!again && !isSubscriber && !hasMinted && (
                        <>
                            <ul>
                                <li>
                                    <Nav
                                        text='"Do you have anything new I might be interested in?"'
                                        next="chapter5"
                                        tag="wantToSubscribe"
                                    />
                                </li>
                            </ul>
                            <C
                                options={[
                                    [
                                        '"Can you show me the dwarves\' gem again?"',
                                        '"Tell me the dwarves\' story again."'
                                    ]
                                ]}
                                widget={BulletedList}
                                tag="again"
                            />
                        </>
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
                            "I'm being kind as you've visited before. But do not waste my time. Are
                            you being serious?"
                        </p>
                        <p>
                            {!wantToBuy && (
                                <>
                                    Do you want to buy a gem?{' '}
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
