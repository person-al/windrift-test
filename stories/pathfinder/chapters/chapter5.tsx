import * as React from 'react'
import { R, C, Section, Chapter, When } from 'core/components'
import { Next, PageType } from 'core/types'
import useInventory from 'core/hooks/use-inventory'
import { useDispatch } from 'react-redux'
import { makeChoice } from 'core/features/choice'
import { AnyAction } from 'redux'
import { Button } from '@chakra-ui/button'
import ChapterPage from './ChapterPage'
import { useBlockchainContext } from 'stories/src/components/BlockchainContext'
import { MintModal } from 'stories/src/components/MintModal'
import { Tooltip } from '@chakra-ui/react'

export const Page: PageType = () => {
    const dispatch = useDispatch()
    const [wantToBuy, wantToSub] = useInventory(['wantToBuy', 'wantToSubscribe'])
    const { signer, isSubscriber, contractConnection } = useBlockchainContext()
    const [gemsRemain, setGemsRemain] = React.useState<boolean>(true)
    const [hasMinted, setHasMinted] = React.useState<boolean>(false)
    const [mintSuccess, setMintSuccess] = React.useState<boolean>(false)
    const [subMintSuccess, setSubMintSuccess] = React.useState<boolean>(false)

    // contractConnection
    //     .totalMinted()
    //     .then((result: number) => {
    //         setGemsRemain(result < 7)
    //     })
    //     .catch((err: Error) => {
    //         console.log(err)
    //     })

    // contractConnection
    //     .totalMintedTo(signer)
    //     .then((result: number) => {
    //         setHasMinted(result > 0)
    //     })
    //     .catch((err: Error) => {
    //         console.log(err)
    //     })

    const getLastLine = () => {
        if (mintSuccess || hasMinted) {
            return ' In the meantime, well, you have another adventure to begin.'
        } else if (subMintSuccess || isSubscriber) {
            return ' You squeeze the new trinket in your pocket gently. Besides, you get a sense that your adventure is only just beginning.'
        } else {
            return ' Besides, you have a feeling your adventure is only just beginning.'
        }
    }

    return (
        <ChapterPage>
            <Chapter filename="chapter5">
                <Section>
                    {wantToBuy === 'Yes' && <p>"I'm sure"</p>}
                    {wantToBuy === 'no' && (
                        <p>
                            "Hm...you're right. Maybe they'd be better off with someone else. What
                            else do you have?"
                        </p>
                    )}

                    {!signer && (
                        <p>
                            <i>Psst! Connect your wallet above.</i>
                        </p>
                    )}

                    {/*Wants to buy and gems are available*/}
                    <When condition={wantToBuy === 'Yes' && signer && !hasMinted && gemsRemain}>
                        <p>
                            With a snap of her finders, The Shopkeeper stretches out her palm to
                            reveal a small wooden box covered in unintelligble symbols. She opens it
                            to reveal a small, dim gem. It looks pale and dusty, almost translucent.
                        </p>
                        <MintModal
                            onSuccess={() => {
                                setMintSuccess(true)
                            }}
                            onError={(_: string) => {
                                // Long term I should read the error message and go from there.
                                setHasMinted(true)
                            }}
                        />

                        <When
                            condition={mintSuccess}
                            otherwise={
                                <Button
                                    onClick={() => {
                                        dispatch(
                                            makeChoice(
                                                'wantToBuy',
                                                'no',
                                                Next.None
                                            ) as unknown as AnyAction
                                        )
                                    }}>
                                    nevermind
                                </Button>
                            }>
                            <p>
                                "When I first took the gems," she said, stroking her frilly fingers
                                across its surface, "They glowed so beautifully. They faded with
                                age. I'm not sure they remember their past anymore."
                            </p>
                            <p>
                                But as she places the gem in your out-stretched palm, it begins to
                                glow, taking on a shiny [color] hue. Like a glistening [gemstone].
                            </p>
                            <p>
                                "Hah!" The Shopkeeper barks. "I suppose you just needed a little
                                adventure, huh?" She smiles up at you, her sharp teeth looking more
                                friendly than before. "It was a pleasure doing business with you.
                                You're welcome back any time."
                            </p>
                            <p>
                                "Thank you," you bow deeply before heading towards the door. "This
                                was truly a magical experience. I will take care of it well."{' '}
                                {!isSubscriber &&
                                    "Just as your hand hits the doorknob, you hear the old woman's soft voice:"}
                            </p>
                            {!isSubscriber && (
                                <p>
                                    "
                                    <C
                                        options={[['Wait...']]}
                                        tag="wantToSubscribe"
                                        next={Next.None}
                                    />
                                    "
                                </p>
                            )}
                        </When>
                    </When>
                    {/*Wants to buy and gems are not available*/}
                    <When condition={wantToBuy === 'Yes' && signer && !hasMinted && !gemsRemain}>
                        <p>
                            Funny, you're not the first to come in asking about that. Unfortunately,
                            the gems are gone. Though perhaps by now [other merchants] have found
                            them.{' '}
                            {!isSubscriber && 'In the meantime, can I offer you something else?'}
                        </p>
                    </When>
                    {/*Wants to buy but has already minted*/}
                    <When condition={wantToBuy === 'Yes' && signer && hasMinted}>
                        <p>
                            "No, no. The gems came from 7 and must go to 7. Though perhaps{' '}
                            <Tooltip label="TODO: link to collection on OpenSea">
                                [other merchants]
                            </Tooltip>{' '}
                            are less principled than I.{' '}
                            {isSubscriber
                                ? 'I have nothing else for you! Though if that changes, my little gift will let you know.'
                                : "You're bold to come again. Perhaps I have something else for you..."}
                            "
                        </p>
                        <p>
                            {isSubscriber ? (
                                <>
                                    You <C options={[['thank her']]} tag="end" /> quickly and leave
                                    before her mood sours further.
                                </>
                            ) : (
                                <>
                                    <C
                                        options={[['"What is it?"']]}
                                        tag="wantToSubscribe"
                                        next={Next.None}
                                    />{' '}
                                    you ask
                                </>
                            )}
                        </p>
                    </When>
                    {/* wants to subscribe */}
                    <When condition={signer && !isSubscriber && (wantToBuy === 'no' || wantToSub)}>
                        <p>
                            She slowly makes her way to the shop counter, reaching beneath it to
                            pull out a small chain with a dull{' '}
                            <R
                                tag="locationChoice"
                                options={{
                                    subway: 'green',
                                    waffle: 'yellow',
                                    woods: 'blue'
                                }}
                            />{' '}
                            gem at the bottom.
                        </p>

                        <p>
                            "I do not do this often," her voice is soft and uncomfortable, "but I
                            have a soft spot for mortals like you. Here, take this: no cost, no
                            curse, no strings attached. Should another...similar work cross my path,
                            it will glow. And you will know to come here again."
                        </p>
                        <p>
                            <Tooltip label="This is under construction" shouldWrapChildren>
                                <Button disabled onClick={() => setSubMintSuccess(true)}>
                                    mint
                                </Button>
                            </Tooltip>
                        </p>
                        <p>
                            You <C options={[['thank her']]} tag="end" next="chapter6" /> quickly
                            and leave before her mood sours further.
                        </p>
                    </When>
                    {/* wants to subscribe but already has subscribed*/}
                    <When condition={signer && isSubscriber && (wantToBuy === 'no' || wantToSub)}>
                        <p>She leans forward, the blue set of eyes blinking open.</p>
                        <p>
                            "I remember you," she mutters. "Yes! I remember you! Now, don't be
                            greedy. I've given you a gift already haven't I? If something new comes,
                            it will tell you."
                        </p>
                        <p>
                            You <C options={[['thank her']]} tag="end" next="chapter6" /> quickly
                            and leave before her mood sours further.
                        </p>
                    </When>
                </Section>
            </Chapter>
        </ChapterPage>
    )
}
