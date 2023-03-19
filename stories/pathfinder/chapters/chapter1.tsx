import * as React from 'react'
import { C, R, Section, Chapter, Nav } from 'core/components'
import { BulletedList } from 'core/components/widgets'
import useInventory from 'core/hooks/use-inventory'
import { Next, PageType } from 'core/types'
import { Text } from '@chakra-ui/layout'
import ChapterPage from './ChapterPage'
import { useBlockchainContext } from 'stories/src/components/BlockchainContext'

export const Page: PageType = () => {
    const [outOfBed, pocketAnimal, begin] = useInventory(['outOfBed', 'pocketAnimal', 'begin'])
    const { signer, hasMinted } = useBlockchainContext()

    return (
        <ChapterPage>
            <Chapter filename="chapter1">
                <Section>
                    <Text>
                        You've heard about The Shopkeeper. An old wives' tale, really, but you
                        believe. She lives somewhere, in The Between, selling her wares to the few
                        who find her. They say she's sold glasses that help mortals see fairy-folk.
                        They say she crafted the sword in the stone. They say she sold the curse
                        that locked Rapunzel in her{' '}
                        <C options={[['tower']]} next={Next.Section} tag="chapter1-1" />.
                    </Text>
                </Section>
                <Section>
                    <Text>
                        But the most secret story. The one you've pieced together through scattered
                        legends and rippling rumors, is that of the gemstone{' '}
                        <C options={[['poem']]} next={Next.Section} tag="chapter1-2" />.
                    </Text>
                </Section>
                <Section>
                    <Text>
                        Deep in the heart of a fiery mountain, they say, thousands of years ago,
                        seven dwarves came together. By day, they mined the mountain for gold and
                        jewels. But by night, they were artists: singing of dreams, painting visions
                        of glory. Their nights were numbered: war was coming. In a fleeting rush,
                        they poured their souls into one final poem, split across seven gemstones.
                        No one is sure what's more valuable: the gems themselves or the poem within.
                        They say The Shopkeeper holds them safe, waiting for those worthy of its
                        purchase.
                    </Text>
                    <Text>You've spent the last year searching, ready to prove you're worthy.</Text>
                    {!begin && (
                        <>
                            {!signer && (
                                <p>
                                    <i>
                                        (Psst! If you've been here before, you can connect your
                                        wallet above for a more custom experience.)
                                    </i>
                                </p>
                            )}
                            <Text>
                                <Nav
                                    text="Begin"
                                    next={hasMinted ? 'alreadyVisited' : Next.Section}
                                    tag="begin"
                                />
                            </Text>
                        </>
                    )}
                </Section>
                <Section>
                    <Text>
                        You wake up quickly to the sound of your alarm, fumbing with your phone so
                        as not to disturb your roommates. It's 2am on a Sunday and you've got work
                        to do. Rumor has it that The Shopkeeper's hut only appears during the
                        darkest hour under the light of a full moon. You rush to get out of bed and
                        pull on some jeans.{' '}
                        {!outOfBed && "You don't have much time, you can either "}
                        <C
                            options={[['brush your teeth,', 'grab a bite to eat']]}
                            last=""
                            extra={{ conjunction: ' ' }}
                            tag="outOfBed"
                        />
                        {!outOfBed && (
                            <>
                                {', or '}
                                <Nav
                                    text="skip getting ready and leave right away"
                                    next="chapter2"
                                />
                            </>
                        )}
                    </Text>
                </Section>
                <Section>
                    <R
                        tag="outOfBed"
                        options={{
                            teeth: (
                                <>
                                    <Text>
                                        You race to the bathroom, brushing your teeth as quickly as
                                        you can. Tonight feels different from the other nights. Good
                                        different. As you lean over to spit in the sink, you notice
                                        your roommate's two small ceramic statues smiling at you
                                        from the counter. One a cheerful green frog and one a
                                        smirking tabby cat. Their smiles seem...more alive than
                                        usual. Should you take one with you?
                                    </Text>
                                    {!pocketAnimal && (
                                        <C
                                            options={[
                                                [
                                                    'pocket the tabby',
                                                    'pocket the frog',
                                                    "leave them both behind: they'll only slow you down"
                                                ]
                                            ]}
                                            widget={BulletedList}
                                            tag="pocketAnimal"
                                        />
                                    )}
                                    <Text>
                                        {pocketAnimal &&
                                            (pocketAnimal.includes('leave')
                                                ? " No, there's no time. You rush out of the bathroom."
                                                : ` On a whim, you ${pocketAnimal} and rush out of the bathroom.`)}
                                    </Text>
                                </>
                            ),
                            eat: (
                                <Text>
                                    You race to the kitchen, pulling a bagel from the fridge and
                                    slathering it with cream cheese. Then you catch sight of the
                                    time. You gotta run. You're going to have to{' '}
                                    <C
                                        options={[['take it with you', 'leave it behind']]}
                                        tag="pocketBagel"
                                    />
                                    .
                                </Text>
                            )
                        }}
                    />
                </Section>
                <Section>
                    <Nav text="You're ready to go." next="chapter2" />
                </Section>
            </Chapter>
        </ChapterPage>
    )
}
